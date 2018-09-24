/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Wiss3NTestModule } from '../../../test.module';
import { SchoolClassDeleteDialogComponent } from 'app/entities/school-class/school-class-delete-dialog.component';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { ISchoolClass } from 'app/shared/model/school-class.model';

describe('Component Tests', () => {
    describe('SchoolClass Management Delete Component', () => {
        let comp: SchoolClassDeleteDialogComponent;
        let fixture: ComponentFixture<SchoolClassDeleteDialogComponent>;
        let service: SchoolClassService;
        const mockSchoolClassService = {delete: (id: number) => null};
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Wiss3NTestModule],
                providers: [{provide: SchoolClassService, useValue: mockSchoolClassService}],
                declarations: [SchoolClassDeleteDialogComponent]
            })
                .overrideTemplate(SchoolClassDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SchoolClassDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolClassService);
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
