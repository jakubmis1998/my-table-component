import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-sorting-control',
  templateUrl: './sorting-control.component.html',
  styleUrls: ['./sorting-control.component.css'],
})
export class SortingControlComponent {

  options = new FormControl();
  @Input() columnsAndOrderDirection: any[];
  url: string = '';


  onSelect(event?: any) {
    if (event) event.stopPropagation();
    this.url = '';
    if (this.options.value) {
      this.url = "?";
      for (let column in this.options.value) {
        let currentColumn = this.columnsAndOrderDirection.filter(x => x.key === this.options.value[column][0])[0];
        let index = this.columnsAndOrderDirection.indexOf(currentColumn);
        let orderingDirection: string = this.columnsAndOrderDirection[index].value ? '' : '-'
        let orderingColumn: string = this.columnsAndOrderDirection[index].key;
        this.url += ("ordering=" + orderingDirection + orderingColumn + "&");
      }
    }
  }

  setOrderingUrl() {
    this.url = "";
    if (this.options.value) {
      this.url = "?";
      for (let column in this.options.value) {
        let xd = this.columnsAndOrderDirection.filter(x => x.key === this.options.value[column][0]);
        let index = this.columnsAndOrderDirection.indexOf(xd[0]);
        let orderingDirection: string = this.columnsAndOrderDirection[index].value ? '' : '-'
        let orderingColumn: string = this.columnsAndOrderDirection[index].key;
        this.url += ("ordering=" + orderingDirection + orderingColumn + "&");
      }
    }
    console.log(this.url);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsAndOrderDirection, event.previousIndex, event.currentIndex);
  }

}
