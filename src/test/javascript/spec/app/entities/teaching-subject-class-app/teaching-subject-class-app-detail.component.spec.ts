/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KlassenchatappTestModule } from '../../../test.module';
import { TeachingSubjectClassAppDetailComponent } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app-detail.component';
import { TeachingSubjectClassAppService } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.service';
import { TeachingSubjectClassApp } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.model';

describe('Component Tests', () => {

    describe('TeachingSubjectClassApp Management Detail Component', () => {
        let comp: TeachingSubjectClassAppDetailComponent;
        let fixture: ComponentFixture<TeachingSubjectClassAppDetailComponent>;
        let service: TeachingSubjectClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TeachingSubjectClassAppDetailComponent],
                providers: [
                    TeachingSubjectClassAppService
                ]
            })
            .overrideTemplate(TeachingSubjectClassAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeachingSubjectClassAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingSubjectClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TeachingSubjectClassApp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.teachingSubject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
