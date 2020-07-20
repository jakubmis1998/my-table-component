import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { columnProperty } from '../columnProperty';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-sorting-control',
  templateUrl: './sorting-control.component.html',
  styleUrls: ['./sorting-control.component.css'],
})
export class SortingControlComponent {

  sortFormControl = new FormControl();
  sortUrl: string = '';
  sortObject: columnProperty[] = [];
  @Input() columnsAndOrderDirection: columnProperty[];
  @Output() sortUrlEmitter = new EventEmitter();
  @Output() sortObjectEmitter = new EventEmitter();


  onSelect(event?: any) {
    if (event) event.stopPropagation();
    this.sortUrl = '';
    this.sortObject = [];
    console.log(this.columnsAndOrderDirection);
    console.log(this.columnsAndOrderDirection[3]);
    if (this.sortFormControl.value.length > 0) {
      this.sortUrl = '?ordering=';
      for (let index in this.columnsAndOrderDirection) {
        if (this.sortFormControl.value.includes(this.columnsAndOrderDirection[index].name)) {

          let columnName: string = this.columnsAndOrderDirection[index].name;
          let sortDirection: string = this.columnsAndOrderDirection[index].sortDirection ? '' : '-';

          this.sortUrl += (sortDirection + columnName + ',');
          this.sortObject.push({
            name: this.columnsAndOrderDirection[index].name,
            verboseName: this.columnsAndOrderDirection[index].verboseName,
            sortDirection: sortDirection === '-' ? false : true
          })
        }
      }
      this.sortUrl = this.sortUrl.slice(0, -1); // Removes last ","
      this.sortUrl += '&';
      this.sortUrlEmitter.emit(this.sortUrl);
      this.sortObjectEmitter.emit(this.sortObject);
    } else {
      this.sortUrlEmitter.emit(null);
      this.sortObjectEmitter.emit(null);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsAndOrderDirection, event.previousIndex, event.currentIndex);
    this.onSelect();
  }

  getFirstColumnInfo() {
    let info: string = '';
    let firstColumn: columnProperty = this.columnsAndOrderDirection.filter(x => x.name === this.sortFormControl.value[0])[0];
    info += firstColumn.verboseName;
    info += ": ";
    if (firstColumn.sortDirection) info += "UP"; else info += "DOWN";
    return info;
  }

}
