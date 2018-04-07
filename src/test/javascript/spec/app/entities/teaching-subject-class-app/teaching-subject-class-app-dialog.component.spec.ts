/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { TeachingSubjectClassAppDialogComponent } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app-dialog.component';
import { TeachingSubjectClassAppService } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.service';
import { TeachingSubjectClassApp } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { TagClassAppService } from '../../../../../../main/webapp/app/entities/tag-class-app';
import { SchoolClassClassAppService } from '../../../../../../main/webapp/app/entities/school-class-class-app';

describe('Component Tests', () => {

    describe('TeachingSubjectClassApp Management Dialog Component', () => {
        let comp: TeachingSubjectClassAppDialogComponent;
        let fixture: ComponentFixture<TeachingSubjectClassAppDialogComponent>;
        let service: TeachingSubjectClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TeachingSubjectClassAppDialogComponent],
                providers: [
                    UserService,
                    TagClassAppService,
                    SchoolClassClassAppService,
                    TeachingSubjectClassAppService
                ]
            })
            .overrideTemplate(TeachingSubjectClassAppDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeachingSubjectClassAppDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingSubjectClassAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TeachingSubjectClassApp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.teachingSubject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teachingSubjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TeachingSubjectClassApp();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.teachingSubject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teachingSubjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
