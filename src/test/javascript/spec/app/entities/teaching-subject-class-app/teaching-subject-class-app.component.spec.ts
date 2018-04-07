/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KlassenchatappTestModule } from '../../../test.module';
import { TeachingSubjectClassAppComponent } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.component';
import { TeachingSubjectClassAppService } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.service';
import { TeachingSubjectClassApp } from '../../../../../../main/webapp/app/entities/teaching-subject-class-app/teaching-subject-class-app.model';

describe('Component Tests', () => {

    describe('TeachingSubjectClassApp Management Component', () => {
        let comp: TeachingSubjectClassAppComponent;
        let fixture: ComponentFixture<TeachingSubjectClassAppComponent>;
        let service: TeachingSubjectClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TeachingSubjectClassAppComponent],
                providers: [
                    TeachingSubjectClassAppService
                ]
            })
            .overrideTemplate(TeachingSubjectClassAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeachingSubjectClassAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingSubjectClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TeachingSubjectClassApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.teachingSubjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
