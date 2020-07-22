import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SortingControlComponent } from './sorting-control.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';

describe('SortingControlComponent', () => {
  let component: SortingControlComponent;
  let fixture: ComponentFixture<SortingControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.columnsAndOrderDirection = [
      { name: 'name', verboseName: 'Imię', sortDirection: true },
      { name: 'lastname', verboseName: 'Nazwisko', sortDirection: false },
      { name: 'age', verboseName: 'Wiek', sortDirection: true }
    ];
    component.sortFormControl.setValue([
      component.columnsAndOrderDirection[1].name,
      component.columnsAndOrderDirection[0].name
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain initial text in selectBox', () => {
    const mat_label = fixture.debugElement.nativeElement;
    expect(mat_label).toBeTruthy();
    expect(mat_label.querySelector('mat-label').textContent).toContain('Sort control');
  });

  it('should return information about first column', () => {
    expect(component.getFirstColumnInfo()).toEqual("Nazwisko: DOWN");
  });

  it('should return information about selected columns', () => {
    const selectBox = fixture.debugElement.query(By.css('mat-select-trigger')).nativeElement;
    expect(selectBox).toBeTruthy();
    selectBox.click();
    fixture.detectChanges();
    const mainTriggerText = fixture.debugElement.query(By.css('mat-select-trigger .columnInfoText')).nativeElement;
    const optionalTriggerText = fixture.debugElement.query(By.css('mat-select-trigger .column-additional-selection')).nativeElement;
    expect(mainTriggerText.textContent).toEqual(' Nazwisko: DOWN ');
    expect(optionalTriggerText.textContent).toEqual(' (+1 other) ');
  });

  it('should return sort object and url', () => {
    spyOn(component.sortUrlEmitter, 'emit');
    spyOn(component.sortObjectEmitter, 'emit');
    //Drag and drop
    moveItemInArray(component.columnsAndOrderDirection, 0, 1);
    component.onSelect();
    expect(component.sortUrlEmitter.emit).toHaveBeenCalled();
    expect(component.sortUrlEmitter.emit).toHaveBeenCalledWith('?ordering=-lastname,name&');
    expect(component.sortObjectEmitter.emit).toHaveBeenCalled();
    // After drag and drop
    expect(component.sortObjectEmitter.emit).toHaveBeenCalledWith([
      component.columnsAndOrderDirection[0],
      component.columnsAndOrderDirection[1]
    ]);
  });
});
