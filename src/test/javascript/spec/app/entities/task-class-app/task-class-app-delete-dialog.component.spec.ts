/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { TaskClassAppDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app-delete-dialog.component';
import { TaskClassAppService } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.service';

describe('Component Tests', () => {

    describe('TaskClassApp Management Delete Component', () => {
        let comp: TaskClassAppDeleteDialogComponent;
        let fixture: ComponentFixture<TaskClassAppDeleteDialogComponent>;
        let service: TaskClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TaskClassAppDeleteDialogComponent],
                providers: [
                    TaskClassAppService
                ]
            })
            .overrideTemplate(TaskClassAppDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskClassAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskClassAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
