import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewMonthCellComponent } from './calendar-view-month-cell.component';

describe('CalendarViewMonthCellComponent', () => {
  let component: CalendarViewMonthCellComponent;
  let fixture: ComponentFixture<CalendarViewMonthCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewMonthCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewMonthCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
