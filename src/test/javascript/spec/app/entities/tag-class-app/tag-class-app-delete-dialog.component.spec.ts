/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { TagClassAppDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app-delete-dialog.component';
import { TagClassAppService } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.service';

describe('Component Tests', () => {

    describe('TagClassApp Management Delete Component', () => {
        let comp: TagClassAppDeleteDialogComponent;
        let fixture: ComponentFixture<TagClassAppDeleteDialogComponent>;
        let service: TagClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TagClassAppDeleteDialogComponent],
                providers: [
                    TagClassAppService
                ]
            })
            .overrideTemplate(TagClassAppDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagClassAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagClassAppService);
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
