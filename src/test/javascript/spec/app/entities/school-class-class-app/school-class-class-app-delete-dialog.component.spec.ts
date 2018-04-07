/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { SchoolClassClassAppDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app-delete-dialog.component';
import { SchoolClassClassAppService } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app.service';

describe('Component Tests', () => {

    describe('SchoolClassClassApp Management Delete Component', () => {
        let comp: SchoolClassClassAppDeleteDialogComponent;
        let fixture: ComponentFixture<SchoolClassClassAppDeleteDialogComponent>;
        let service: SchoolClassClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [SchoolClassClassAppDeleteDialogComponent],
                providers: [
                    SchoolClassClassAppService
                ]
            })
            .overrideTemplate(SchoolClassClassAppDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolClassClassAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolClassClassAppService);
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
