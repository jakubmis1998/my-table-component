import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColumnProperty } from '../columnProperty';


@Component({
  selector: 'app-sorting-control',
  templateUrl: './sorting-control.component.html',
  styleUrls: ['./sorting-control.component.css'],
})
export class SortingControlComponent {
  sortFormControl = new FormControl();
  sortObject: ColumnProperty[] = [];
  sortUrl: string;

  @Input() columnsAndOrderDirection: ColumnProperty[];
  @Output() sortObjectEmitter = new EventEmitter();
  @Output() sortUrlEmitter = new EventEmitter();

  onSelect(column?: string): void {
    this.sortUrl = '';
    this.sortObject = [];

    if (column) {
      const col = this.columnsAndOrderDirection.find(x => x.column === column);
      col.direction = col.direction === 'asc' ? 'desc' : 'asc';
    }

    if (this.sortFormControl.value) {
      this.sortUrl = 'ordering=';
      for (const index in this.columnsAndOrderDirection) {
        if (this.sortFormControl.value.includes(this.columnsAndOrderDirection[index].column)) {

          const nameOfColumn: string = this.columnsAndOrderDirection[index].column;
          const sortDirection: string = this.columnsAndOrderDirection[index].direction === 'asc' ? '' : '-';

          this.sortUrl += (sortDirection + nameOfColumn + ',');
          this.sortObject.push({
            column: this.columnsAndOrderDirection[index].column,
            verboseName: this.columnsAndOrderDirection[index].verboseName,
            direction: this.columnsAndOrderDirection[index].direction
          });
        }
      }
      this.sortUrl = this.sortUrl.slice(0, -1); // Removes last ","
      this.sortUrlEmitter.emit(this.sortUrl);
      this.sortObjectEmitter.emit(this.sortObject);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columnsAndOrderDirection, event.previousIndex, event.currentIndex);
    this.onSelect();
  }

  getFirstColumnInfo(): ColumnProperty {
    for (const index in this.columnsAndOrderDirection) {
      if (this.sortFormControl.value.includes(this.columnsAndOrderDirection[index].column)) {
        return this.columnsAndOrderDirection[index];
      }
    }
  }

}
