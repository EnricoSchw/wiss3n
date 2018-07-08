/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Wiss3NTestModule } from '../../../test.module';
import { TeachingHourUpdateComponent } from 'app/entities/teaching-hour/teaching-hour-update.component';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';
import { TeachingHour } from 'app/shared/model/teaching-hour.model';

describe('Component Tests', () => {
    describe('TeachingHour Management Update Component', () => {
        let comp: TeachingHourUpdateComponent;
        let fixture: ComponentFixture<TeachingHourUpdateComponent>;
        let service: TeachingHourService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule],
                declarations: [TeachingHourUpdateComponent]
            })
                .overrideTemplate(TeachingHourUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeachingHourUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingHourService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TeachingHour(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teachingHour = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TeachingHour();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teachingHour = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
