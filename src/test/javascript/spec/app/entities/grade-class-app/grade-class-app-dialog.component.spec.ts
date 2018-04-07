/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { GradeClassAppDialogComponent } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app-dialog.component';
import { GradeClassAppService } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app.service';
import { GradeClassApp } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app.model';
import { TaskClassAppService } from '../../../../../../main/webapp/app/entities/task-class-app';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('GradeClassApp Management Dialog Component', () => {
        let comp: GradeClassAppDialogComponent;
        let fixture: ComponentFixture<GradeClassAppDialogComponent>;
        let service: GradeClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [GradeClassAppDialogComponent],
                providers: [
                    TaskClassAppService,
                    UserService,
                    GradeClassAppService
                ]
            })
            .overrideTemplate(GradeClassAppDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GradeClassAppDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GradeClassAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GradeClassApp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.grade = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'gradeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GradeClassApp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.grade = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'gradeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
