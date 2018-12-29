import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';

type EntityResponseType = HttpResponse<ISchoolClass>;
type EntityArrayResponseType = HttpResponse<ISchoolClass[]>;

@Injectable({providedIn: 'root'})
export class SchoolClassService {
    private resourceUrl = SERVER_API_URL + 'api/school-classes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/school-classes';

    constructor(private http: HttpClient, private store: StoreSchoolClassService) {
    }

    create(schoolClass: ISchoolClass): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schoolClass);
        return this.http
            .post<ISchoolClass>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertDateFromServer(res))
            .map((res: EntityResponseType) => {
                this.store.add(res.body);
                return res;
            });
    }

    update(schoolClass: ISchoolClass): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schoolClass);
        return this.http
            .put<ISchoolClass>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertDateFromServer(res))
            .map((res: EntityResponseType) => {
                this.store.upsert(res.body);
                return res;
            });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISchoolClass>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchoolClass[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => {
                this.store.delete(id);
                return res;
            });
    }

    searchActive(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchoolClass[]>(this.resourceSearchUrl + '/active', {params: options, observe: 'response'})
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))
            .map((res: EntityArrayResponseType) => {
                this.store.loadAll(res.body);
                return res;
            });
    }

    searchForTeachingHours(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITeachingHour[]>(this.resourceSearchUrl + '/' + id + '/teaching-hours', {
                params: options,
                observe: 'response'
            })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchoolClass[]>(this.resourceSearchUrl, {params: options, observe: 'response'})
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    private convertDateFromClient(schoolClass: ISchoolClass): ISchoolClass {
        const copy: ISchoolClass = Object.assign({}, schoolClass, {
            start: schoolClass.start != null && schoolClass.start.isValid() ? schoolClass.start.format(DATE_FORMAT) : null,
            end: schoolClass.end != null && schoolClass.end.isValid() ? schoolClass.end.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.start = res.body.start != null ? moment(res.body.start) : null;
        res.body.end = res.body.end != null ? moment(res.body.end) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((schoolClass: ISchoolClass) => {
            schoolClass.start = schoolClass.start != null ? moment(schoolClass.start) : null;
            schoolClass.end = schoolClass.end != null ? moment(schoolClass.end) : null;
        });
        return res;
    }

    public activateBySchoolClassId(id: number) {
        this.store.activateBySchoolClassId(id);
    }
}
