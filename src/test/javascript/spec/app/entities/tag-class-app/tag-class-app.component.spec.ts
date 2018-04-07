/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KlassenchatappTestModule } from '../../../test.module';
import { TagClassAppComponent } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.component';
import { TagClassAppService } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.service';
import { TagClassApp } from '../../../../../../main/webapp/app/entities/tag-class-app/tag-class-app.model';

describe('Component Tests', () => {

    describe('TagClassApp Management Component', () => {
        let comp: TagClassAppComponent;
        let fixture: ComponentFixture<TagClassAppComponent>;
        let service: TagClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TagClassAppComponent],
                providers: [
                    TagClassAppService
                ]
            })
            .overrideTemplate(TagClassAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagClassAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TagClassApp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
