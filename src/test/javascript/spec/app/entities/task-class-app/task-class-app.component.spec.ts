/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KlassenchatappTestModule } from '../../../test.module';
import { TaskClassAppComponent } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.component';
import { TaskClassAppService } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.service';
import { TaskClassApp } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.model';

describe('Component Tests', () => {

    describe('TaskClassApp Management Component', () => {
        let comp: TaskClassAppComponent;
        let fixture: ComponentFixture<TaskClassAppComponent>;
        let service: TaskClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TaskClassAppComponent],
                providers: [
                    TaskClassAppService
                ]
            })
            .overrideTemplate(TaskClassAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskClassAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TaskClassApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tasks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
