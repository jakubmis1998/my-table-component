import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
