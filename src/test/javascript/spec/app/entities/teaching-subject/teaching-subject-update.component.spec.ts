/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Wiss3NTestModule } from '../../../test.module';
import { TeachingSubjectUpdateComponent } from 'app/entities/teaching-subject/teaching-subject-update.component';
import { TeachingSubjectService } from 'app/entities/teaching-subject/teaching-subject.service';
import { TeachingSubject } from 'app/shared/model/teaching-subject.model';
import { Wiss3NStoreModule } from 'app/store/store.module';

describe('Component Tests', () => {
    describe('TeachingSubject Management Update Component', () => {
        let comp: TeachingSubjectUpdateComponent;
        let fixture: ComponentFixture<TeachingSubjectUpdateComponent>;
        let service: TeachingSubjectService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule, Wiss3NStoreModule],
                declarations: [TeachingSubjectUpdateComponent]
            })
                .overrideTemplate(TeachingSubjectUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeachingSubjectUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingSubjectService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TeachingSubject(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teachingSubject = entity;
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
                    const entity = new TeachingSubject();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teachingSubject = entity;
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
