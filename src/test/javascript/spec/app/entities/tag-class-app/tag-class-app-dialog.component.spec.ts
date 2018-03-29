/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { TagClassAppDialogComponent } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app-dialog.component';
import { TagClassAppService } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.service';
import { TagClassApp } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.model';

describe('Component Tests', () => {

    describe('TagClassApp Management Dialog Component', () => {
        let comp: TagClassAppDialogComponent;
        let fixture: ComponentFixture<TagClassAppDialogComponent>;
        let service: TagClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TagClassAppDialogComponent],
                providers: [
                    TagClassAppService
                ]
            })
            .overrideTemplate(TagClassAppDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagClassAppDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagClassAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TagClassApp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TagClassApp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
