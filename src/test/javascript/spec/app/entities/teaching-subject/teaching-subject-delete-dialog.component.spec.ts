/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Wiss3NTestModule } from '../../../test.module';
import { TeachingSubjectDeleteDialogComponent } from 'app/entities/teaching-subject/teaching-subject-delete-dialog.component';
import { TeachingSubjectService } from 'app/entities/teaching-subject/teaching-subject.service';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';

describe('Component Tests', () => {
    describe('TeachingSubject Management Delete Component', () => {
        let comp: TeachingSubjectDeleteDialogComponent;
        let fixture: ComponentFixture<TeachingSubjectDeleteDialogComponent>;
        let service: TeachingSubjectService;
        const mockTeachingSubjectService = {delete: (id: number) => null};
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule],
                declarations: [TeachingSubjectDeleteDialogComponent],
                providers: [{provide: TeachingSubjectService, useValue: mockTeachingSubjectService}]
            })
                .overrideTemplate(TeachingSubjectDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeachingSubjectDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingSubjectService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

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
