/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Wiss3NTestModule } from '../../../test.module';
import { SchoolClassUpdateComponent } from 'app/entities/school-class/school-class-update.component';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { SchoolClass } from 'app/shared/model/school-class.model';

describe('Component Tests', () => {
    describe('SchoolClass Management Update Component', () => {
        let comp: SchoolClassUpdateComponent;
        let fixture: ComponentFixture<SchoolClassUpdateComponent>;
        let service: SchoolClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule],
                declarations: [SchoolClassUpdateComponent]
            })
                .overrideTemplate(SchoolClassUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SchoolClassUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolClassService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SchoolClass(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.schoolClass = entity;
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
                    const entity = new SchoolClass();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.schoolClass = entity;
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
