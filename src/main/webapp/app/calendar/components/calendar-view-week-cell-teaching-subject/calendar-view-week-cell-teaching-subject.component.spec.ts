import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewWeekCellTeachingSubjectComponent } from './calendar-view-week-cell-teaching-subject.component';

describe('CalendarViewWeekCellTeachingSubjectComponent', () => {
  let component: CalendarViewWeekCellTeachingSubjectComponent;
  let fixture: ComponentFixture<CalendarViewWeekCellTeachingSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewWeekCellTeachingSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewWeekCellTeachingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
