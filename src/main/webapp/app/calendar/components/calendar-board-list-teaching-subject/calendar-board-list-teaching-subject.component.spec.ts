import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBoardListTeachingSubjectComponent } from './calendar-teaching-subject-list.component';

describe('CalendarTeachingSubjectListComponent', () => {
  let component: CalendarBoardListTeachingSubjectComponent;
  let fixture: ComponentFixture<CalendarBoardListTeachingSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarBoardListTeachingSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBoardListTeachingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
