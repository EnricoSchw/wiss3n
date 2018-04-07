/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KlassenchatappTestModule } from '../../../test.module';
import { ContentClassAppDetailComponent } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app-detail.component';
import { ContentClassAppService } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app.service';
import { ContentClassApp } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app.model';

describe('Component Tests', () => {

    describe('ContentClassApp Management Detail Component', () => {
        let comp: ContentClassAppDetailComponent;
        let fixture: ComponentFixture<ContentClassAppDetailComponent>;
        let service: ContentClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [ContentClassAppDetailComponent],
                providers: [
                    ContentClassAppService
                ]
            })
            .overrideTemplate(ContentClassAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentClassAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ContentClassApp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.content).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
