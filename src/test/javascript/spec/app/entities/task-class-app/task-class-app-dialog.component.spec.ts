/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { TaskClassAppDialogComponent } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app-dialog.component';
import { TaskClassAppService } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.service';
import { TaskClassApp } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { TeachingSubjectClassAppService } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app';

describe('Component Tests', () => {

    describe('TaskClassApp Management Dialog Component', () => {
        let comp: TaskClassAppDialogComponent;
        let fixture: ComponentFixture<TaskClassAppDialogComponent>;
        let service: TaskClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TaskClassAppDialogComponent],
                providers: [
                    UserService,
                    TeachingSubjectClassAppService,
                    TaskClassAppService
                ]
            })
            .overrideTemplate(TaskClassAppDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskClassAppDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskClassAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TaskClassApp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.task = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'taskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TaskClassApp();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.task = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'taskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
