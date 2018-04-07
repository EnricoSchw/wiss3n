/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { KlassenchatappTestModule } from '../../../test.module';
import { SchoolClassClassAppDetailComponent } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app-detail.component';
import { SchoolClassClassAppService } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app.service';
import { SchoolClassClassApp } from '../../../../../../main/webapp/app/entities/school-class-class-app/school-class-class-app.model';

describe('Component Tests', () => {

    describe('SchoolClassClassApp Management Detail Component', () => {
        let comp: SchoolClassClassAppDetailComponent;
        let fixture: ComponentFixture<SchoolClassClassAppDetailComponent>;
        let service: SchoolClassClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [SchoolClassClassAppDetailComponent],
                providers: [
                    SchoolClassClassAppService
                ]
            })
            .overrideTemplate(SchoolClassClassAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolClassClassAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolClassClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SchoolClassClassApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.schoolClass).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
