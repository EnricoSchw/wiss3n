/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KlassenchatappTestModule } from '../../../test.module';
import { ContentClassAppComponent } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app.component';
import { ContentClassAppService } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app.service';
import { ContentClassApp } from '../../../../../../main/webapp/app/entities/content-class-app/content-class-app.model';

describe('Component Tests', () => {

    describe('ContentClassApp Management Component', () => {
        let comp: ContentClassAppComponent;
        let fixture: ComponentFixture<ContentClassAppComponent>;
        let service: ContentClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [ContentClassAppComponent],
                providers: [
                    ContentClassAppService
                ]
            })
            .overrideTemplate(ContentClassAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentClassAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ContentClassApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
