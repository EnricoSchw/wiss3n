/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { KlassenchatappTestModule } from '../../../test.module';
import { TaskClassAppDetailComponent } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app-detail.component';
import { TaskClassAppService } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.service';
import { TaskClassApp } from '../../../../../../main/webapp/app/entities/task-class-app/task-class-app.model';

describe('Component Tests', () => {

    describe('TaskClassApp Management Detail Component', () => {
        let comp: TaskClassAppDetailComponent;
        let fixture: ComponentFixture<TaskClassAppDetailComponent>;
        let service: TaskClassAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KlassenchatappTestModule],
                declarations: [TaskClassAppDetailComponent],
                providers: [
                    TaskClassAppService
                ]
            })
            .overrideTemplate(TaskClassAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskClassAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskClassAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TaskClassApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.task).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
