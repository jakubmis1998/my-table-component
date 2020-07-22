import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SortingControlComponent } from './sorting-control.component';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains initial text in select', () => {
    const mat_label = fixture.debugElement.nativeElement;
    expect(mat_label).toBeTruthy();
    expect(mat_label.querySelector('mat-label').textContent).toContain('Sort control');
    // const mat_label = fixture.debugElement.query(By.css('h1')).nativeElement;
    // expect(h1).toBeTruthy();
    // expect(h1.textContent).toContain(0);
  });

  it('contains good text after select some values', () => {
    component.columnsAndOrderDirection = [
      { 'name': 'name', 'verboseName': 'Imię', 'sortDirection': true },
      { 'name': 'lastname', 'verboseName': 'Nazwisko', 'sortDirection': true },
      { 'name': 'age', 'verboseName': 'Wiek', 'sortDirection': true },
    ];
    component.onInit
    const input = fixture.debugElement.query(By.css('#option')).nativeElement;
    expect(input).toBeTruthy();
    expect(input.checked).toBeFalsy(); // default state

    input.click();
    fixture.detectChanges();

    expect(input.checked).toBeTruthy(); // state after click
  });
});
