import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeachingSubjectComponent } from './select-teaching-subject.component';

describe('SelectTeachingSubjectComponent', () => {
  let component: SelectTeachingSubjectComponent;
  let fixture: ComponentFixture<SelectTeachingSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTeachingSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTeachingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
