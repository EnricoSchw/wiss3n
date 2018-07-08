/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Wiss3NTestModule } from '../../../test.module';
import { TeachingHourDeleteDialogComponent } from 'app/entities/teaching-hour/teaching-hour-delete-dialog.component';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';

describe('Component Tests', () => {
    describe('TeachingHour Management Delete Component', () => {
        let comp: TeachingHourDeleteDialogComponent;
        let fixture: ComponentFixture<TeachingHourDeleteDialogComponent>;
        let service: TeachingHourService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule],
                declarations: [TeachingHourDeleteDialogComponent]
            })
                .overrideTemplate(TeachingHourDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeachingHourDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingHourService);
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
