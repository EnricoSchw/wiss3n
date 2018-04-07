/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { KlassenchatappTestModule } from '../../../test.module';
import { TagClassAppDetailComponent } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app-detail.component';
import { TagClassAppService } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.service';
import { TagClassApp } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.model';

describe('Component Tests', () => {

    describe('TagClassApp Management Detail Component', () => {
        let comp: TagClassAppDetailComponent;
        let fixture: ComponentFixture<TagClassAppDetailComponent>;
        let service: TagClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TagClassAppDetailComponent],
                providers: [
                    TagClassAppService
                ]
            })
            .overrideTemplate(TagClassAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagClassAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TagClassApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tag).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
