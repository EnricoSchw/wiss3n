/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { SchoolClass } from 'app/shared/model/school-class.model';
import { SERVER_API_URL } from 'app/app.constants';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';

describe('Service Tests', () => {
    describe('SchoolClass Service', () => {
        let injector: TestBed;
        let service: SchoolClassService;
        let httpMock: HttpTestingController;
        let store: StoreSchoolClassService;
        const storeMock = {
            add: () => null,
            upsert: () => null,
            delete: () => null
        };

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    {provide: StoreSchoolClassService, useValue: storeMock}
                ]
            });
            injector = getTestBed();
            service = injector.get(SchoolClassService);
            store = injector.get(StoreSchoolClassService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                const req = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + 'api/school-classes';
                expect(req.request.url).toEqual(resourceUrl + '/' + 123);
            });

            it('should create a SchoolClass', () => {
                spyOn(store, 'add');
                service.create(new SchoolClass(null)).subscribe(received => {
                    expect(received.body.id).toEqual(null);
                    expect(store.add).toHaveBeenCalledWith(received.body);
                });

                const req = httpMock.expectOne({ method: 'POST' });
                req.flush({ id: null });
            });

            it('should update a SchoolClass', () => {
                spyOn(store, 'upsert');
                service.update(new SchoolClass(123)).subscribe(received => {
                    expect(received.body.id).toEqual(123);
                    expect(store.upsert).toHaveBeenCalledWith(received.body);
                });

                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush({ id: 123 });
            });

            it('should return a SchoolClass', () => {
                service.find(123).subscribe(received => {
                    expect(received.body.id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({ id: 123 });
            });

            it('should return a list of SchoolClass', () => {
                service.query(null).subscribe(received => {
                    expect(received.body[0].id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([new SchoolClass(123)]);
            });

            it('should delete a SchoolClass', () => {
                spyOn(store, 'delete');
                service.delete(123).subscribe(received => {
                    expect(received.url).toContain('/' + 123);
                    expect(store.delete).toHaveBeenCalledWith(123);
                });

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush(null);
            });

            it('should propagate not found response', () => {
                service.find(123).subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404,
                    statusText: 'Bad Request'
                });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
