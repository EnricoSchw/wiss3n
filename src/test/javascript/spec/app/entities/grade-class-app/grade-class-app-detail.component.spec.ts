/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KlassenchatappTestModule } from '../../../test.module';
import { GradeClassAppDetailComponent } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app-detail.component';
import { GradeClassAppService } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app.service';
import { GradeClassApp } from '../../../../../../main/webapp/app/entities/grade-class-app/grade-class-app.model';

describe('Component Tests', () => {

    describe('GradeClassApp Management Detail Component', () => {
        let comp: GradeClassAppDetailComponent;
        let fixture: ComponentFixture<GradeClassAppDetailComponent>;
        let service: GradeClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [GradeClassAppDetailComponent],
                providers: [
                    GradeClassAppService
                ]
            })
            .overrideTemplate(GradeClassAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GradeClassAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GradeClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new GradeClassApp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.grade).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
