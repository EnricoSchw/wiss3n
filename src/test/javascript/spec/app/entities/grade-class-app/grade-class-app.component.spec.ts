/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KlassenchatappTestModule } from '../../../test.module';
import { GradeClassAppComponent } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app.component';
import { GradeClassAppService } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app.service';
import { GradeClassApp } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app.model';

describe('Component Tests', () => {

    describe('GradeClassApp Management Component', () => {
        let comp: GradeClassAppComponent;
        let fixture: ComponentFixture<GradeClassAppComponent>;
        let service: GradeClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [GradeClassAppComponent],
                providers: [
                    GradeClassAppService
                ]
            })
            .overrideTemplate(GradeClassAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GradeClassAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GradeClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GradeClassApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.grades[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
