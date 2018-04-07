/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KlassenchatappTestModule } from '../../../test.module';
import { ContentClassAppDialogComponent } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app-dialog.component';
import { ContentClassAppService } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app.service';
import { ContentClassApp } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { TaskClassAppService } from '../../../../../../main/webapp/app/entities/task-class-app';
import { TagClassAppService } from '../../../../../../main/webapp/app/entities/tag-class-app';

describe('Component Tests', () => {

    describe('ContentClassApp Management Dialog Component', () => {
        let comp: ContentClassAppDialogComponent;
        let fixture: ComponentFixture<ContentClassAppDialogComponent>;
        let service: ContentClassAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [ContentClassAppDialogComponent],
                providers: [
                    UserService,
                    TaskClassAppService,
                    TagClassAppService,
                    ContentClassAppService
                ]
            })
            .overrideTemplate(ContentClassAppDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentClassAppDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentClassAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ContentClassApp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.content = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ContentClassApp();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.content = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
