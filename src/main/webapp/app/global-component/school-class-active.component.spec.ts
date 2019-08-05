import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassActiveComponent } from './school-class-active.component';

describe('SchoolClassActiveComponent', () => {
  let component: SchoolClassActiveComponent;
  let fixture: ComponentFixture<SchoolClassActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolClassActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
