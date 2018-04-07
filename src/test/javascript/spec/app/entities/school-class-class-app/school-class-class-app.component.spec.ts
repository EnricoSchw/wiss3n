/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KlassenchatappTestModule } from '../../../test.module';
import { SchoolClassClassAppComponent } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app.component';
import { SchoolClassClassAppService } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app.service';
import { SchoolClassClassApp } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app.model';

describe('Component Tests', () => {

    describe('SchoolClassClassApp Management Component', () => {
        let comp: SchoolClassClassAppComponent;
        let fixture: ComponentFixture<SchoolClassClassAppComponent>;
        let service: SchoolClassClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [SchoolClassClassAppComponent],
                providers: [
                    SchoolClassClassAppService
                ]
            })
            .overrideTemplate(SchoolClassClassAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolClassClassAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolClassClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SchoolClassClassApp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.schoolClasses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
