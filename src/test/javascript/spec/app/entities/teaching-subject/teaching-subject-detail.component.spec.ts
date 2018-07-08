/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Wiss3NTestModule } from '../../../test.module';
import { TeachingSubjectDetailComponent } from 'app/entities/teaching-subject/teaching-subject-detail.component';
import { TeachingSubject } from 'app/shared/model/teaching-subject.model';

describe('Component Tests', () => {
    describe('TeachingSubject Management Detail Component', () => {
        let comp: TeachingSubjectDetailComponent;
        let fixture: ComponentFixture<TeachingSubjectDetailComponent>;
        const route = ({ data: of({ teachingSubject: new TeachingSubject(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule],
                declarations: [TeachingSubjectDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeachingSubjectDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeachingSubjectDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.teachingSubject).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
