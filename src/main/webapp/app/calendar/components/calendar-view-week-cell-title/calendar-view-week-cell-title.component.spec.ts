import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewWeekCellTitleComponent } from './calendar-view-week-cell-title.component';

describe('CalendarViewWeekCellTitleComponent', () => {
  let component: CalendarViewWeekCellTitleComponent;
  let fixture: ComponentFixture<CalendarViewWeekCellTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewWeekCellTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewWeekCellTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
