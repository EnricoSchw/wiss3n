/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Wiss3NTestModule } from '../../../test.module';
import { TeachingHourDetailComponent } from 'app/entities/teaching-hour/teaching-hour-detail.component';
import { TeachingHour } from 'app/shared/model/teaching-hour.model';

describe('Component Tests', () => {
    describe('TeachingHour Management Detail Component', () => {
        let comp: TeachingHourDetailComponent;
        let fixture: ComponentFixture<TeachingHourDetailComponent>;
        const route = ({ data: of({ teachingHour: new TeachingHour(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule],
                declarations: [TeachingHourDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeachingHourDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeachingHourDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.teachingHour).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
