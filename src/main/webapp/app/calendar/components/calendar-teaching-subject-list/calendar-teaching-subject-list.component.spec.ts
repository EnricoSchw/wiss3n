import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTeachingSubjectListComponent } from './calendar-teaching-subject-list.component';

describe('CalendarTeachingSubjectListComponent', () => {
  let component: CalendarTeachingSubjectListComponent;
  let fixture: ComponentFixture<CalendarTeachingSubjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTeachingSubjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTeachingSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
