/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { TeachingSubjectClassAppDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app-delete-dialog.component';
import { TeachingSubjectClassAppService } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.service';

describe('Component Tests', () => {

    describe('TeachingSubjectClassApp Management Delete Component', () => {
        let comp: TeachingSubjectClassAppDeleteDialogComponent;
        let fixture: ComponentFixture<TeachingSubjectClassAppDeleteDialogComponent>;
        let service: TeachingSubjectClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TeachingSubjectClassAppDeleteDialogComponent],
                providers: [
                    TeachingSubjectClassAppService
                ]
            })
            .overrideTemplate(TeachingSubjectClassAppDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeachingSubjectClassAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingSubjectClassAppService);
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
