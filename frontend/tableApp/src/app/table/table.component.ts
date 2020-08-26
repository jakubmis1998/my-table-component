import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { ColumnProperty } from '../columnProperty';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ApiService]
})
export class TableComponent implements AfterViewInit {

  // Source data
  persons: any[] = [];
  columns: ColumnProperty[] = [];
  sortUrl: string = '';
  sortObject: ColumnProperty[] = [];
  // Clicked row: person
  selectedPerson: any;
  // All columns and their verbose names
  displayedColumns = [];
  // For column switch on/off - headers
  columnsToDisplay: string[] = [];
  // For pagination
  pageSize: number;
  pageIndex: number;
  length: number;
  propertiesUrl = this.api.baseUrl + "/persons/"; //url to query for the properties
  // For spinner
  dataFetched = true;
  // For formly
  createPersonForm = new FormGroup({});
  model = {};
  formFields: FormlyFieldConfig[] = [];
  // For form, filters, column visibility, table in expansion panels
  formOpenState = false;
  filterOpenState = false;
  visibilityOpenState = false;
  tableOpenState = true;
  sortControlOpenState = false;
  // For filtering
  filterForm = new FormGroup({});
  filterFields: FormlyFieldConfig[] = [];
  // For row checkboxes
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        // Create a request for API with page_size and page_index
        switchMap(() => {
          this.dataFetched = true;
          return this.api.getFullRequest(this.sort, this.paginator, this.filterForm.value);
        }),
        map(response => {
          this.dataFetched = false;
          this.length = response.count; // Total count
          return response.results;
        }),
        catchError(() => {
          this.dataFetched = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.persons = data;
      }); // Assign results to persons
  }

  constructor(private api: ApiService, private toastr: ToastrService) {
    this.getOptions(); // Create form
    this.selectedPerson = { id: -1, firstname: '', lastname: '', age: '' };
  }

  // Get all persons
  getPersons = () => {
    this.api.getAllPersons().subscribe(
      data => {
        this.persons = data.results;
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          const index: number = this.columnsToDisplay.indexOf(keyError);
          this.toastr.error(this.displayedColumns[index].value + ": " + error.error[keyError], 'Error');
        });
      }
    );
  }

  // Assign clicked row to selectedPerson - to update
  personClicked = (person, event) => {
    event.stopPropagation(); // Do not mark checkbox when edit row
    this.api.getPerson(person.id).subscribe(
      data => {
        this.selectedPerson = data;
        this.formOpenState = true; // Automatic open form with row data
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          const index: number = this.columnsToDisplay.indexOf(keyError);
          this.toastr.error(this.displayedColumns[index].value + ": " + error.error[keyError], 'Error');
        });
      }
    );
  }

  // Update person
  updatePerson = () => {
    this.api.updatePerson(this.selectedPerson).subscribe(
      data => {
        this.getPersons();
        this.toastr.success('Successfully updated', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          const index: number = this.columnsToDisplay.indexOf(keyError);
          this.toastr.error(this.displayedColumns[index].value + ": " + error.error[keyError], 'Error');
        });
      }
    );
  }

  // Delete person
  deletePerson = () => {
    this.api.deletePerson(this.selectedPerson.id).subscribe(
      data => {
        this.getPersons();
        this.toastr.success('Successfully deleted', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          const index: number = this.columnsToDisplay.indexOf(keyError);
          this.toastr.error(this.displayedColumns[index].value + ": " + error.error[keyError], 'Error');
        });
      }
    );
  }

  // Get options from api
  getOptions = () => {
    this.api.getOptions().subscribe(
      data => {
        this.displayedColumns.push({ key: "select", value: "Select" });
        this.displayedColumns.push({ key: "position", value: "No." });
        for (let item in data) {
          this.displayedColumns.push({ key: data[item].key, value: data[item].templateOptions.label });
        }
        this.displayedColumns.push({ key: "actions", value: "Actions" });
        // Add column headers to display on/off
        this.displayedColumns.forEach(element => {
          this.columnsToDisplay.push(element.key);
        });
        // Add options for form
        for (let field in data) {
          data[field].className = "inputField";
        }
        this.formFields = data;
        // Add options for filter form
        this.api.getOptions().subscribe(
          data => {
            for (let field in data) {
              data[field].templateOptions.required = false;
              data[field].className = "inputField";
            }
            this.filterFields = data;
          }
        );
        // Add only columns
        for (let column in this.displayedColumns) {
          this.columns.push({
            'column': this.displayedColumns[column].key,
            'verboseName': this.displayedColumns[column].value,
            'direction': 'asc'
          });
        }
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          const index: number = this.columnsToDisplay.indexOf(keyError);
          this.toastr.error(this.displayedColumns[index].value + ": " + error.error[keyError], 'Error');
        });
      }
    );
  }

  // Create person
  createPerson = () => {
    this.api.createPerson(this.selectedPerson).subscribe(
      data => {
        this.persons.unshift(data)
        this.length++;
        this.toastr.success('Successfully added', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          const index: number = this.columnsToDisplay.indexOf(keyError);
          this.toastr.error(this.displayedColumns[index].value + ": " + error.error[keyError], 'Error');
        });
      }
    );
  }

  // Submit create form
  onSubmit() {
    this.createPerson();
  }

  // Switch columns order
  drop(event: CdkDragDrop<string[]>) {
    // Swap headers and values of table
    moveItemInArray(this.displayedColumns, event.previousIndex + 1, event.currentIndex + 1);
    // Checkboxes
    moveItemInArray(this.columnsToDisplay, event.previousIndex + 1, event.currentIndex + 1);
  }

  filterData = () => {
    this.paginator.pageIndex = 0;
    this.api.getFullRequest(this.sort, this.paginator, this.filterForm.value).subscribe(
      data => {
        this.persons = data.results;
        this.length = data.count;
        this.toastr.success('Successfully filtered', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          const index: number = this.columnsToDisplay.indexOf(keyError);
          this.toastr.error(this.displayedColumns[index].value + ": " + error.error[keyError], 'Error');
        });
      }
    );
  }

  cleanFilterForm() {
    this.filterForm.reset();
    this.api.getFullRequest(this.sort, this.paginator, this.filterForm.value);
  }

  cleanForm() {
    this.createPersonForm.reset();
    this.selectedPerson.id = -1;
  }

  /** If number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.persons.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.persons.forEach(row => this.selection.select(row));
  }

  refreshColumns(column, indexPosition: number, event) {
    let index: number;
    if (event.checked) {
      index = this.displayedColumns.indexOf(column);
      this.columnsToDisplay.splice(indexPosition, 0, this.displayedColumns[index].key);
    } else {
      index = this.columnsToDisplay.indexOf(column.key);
      if (index !== -1) {
        this.columnsToDisplay.splice(index, 1);
      }
    }
  }

  receiveSortUrl(sortUrl: string) {
    if (sortUrl) this.sortUrl = sortUrl;
  }

  receiveSortObject(sortObject: ColumnProperty[]) {
    if (sortObject) this.sortObject = sortObject;
  }

  ifSelected(row) {
    if (this.selection.selected.find(x => x === row)) return true;
    else return false;
  }

}
