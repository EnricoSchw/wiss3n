import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewWeekCellComponent } from './calendar-view-week-cell.component';

describe('CalendarViewWeekCellComponent', () => {
  let component: CalendarViewWeekCellComponent;
  let fixture: ComponentFixture<CalendarViewWeekCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewWeekCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewWeekCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
