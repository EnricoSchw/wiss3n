import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SchoolClassClassApp } from './school-class-class-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SchoolClassClassApp>;

@Injectable()
export class SchoolClassClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/school-classes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(schoolClass: SchoolClassClassApp): Observable<EntityResponseType> {
        const copy = this.convert(schoolClass);
        return this.http.post<SchoolClassClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(schoolClass: SchoolClassClassApp): Observable<EntityResponseType> {
        const copy = this.convert(schoolClass);
        return this.http.put<SchoolClassClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SchoolClassClassApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SchoolClassClassApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<SchoolClassClassApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SchoolClassClassApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SchoolClassClassApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SchoolClassClassApp[]>): HttpResponse<SchoolClassClassApp[]> {
        const jsonResponse: SchoolClassClassApp[] = res.body;
        const body: SchoolClassClassApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SchoolClassClassApp.
     */
    private convertItemFromServer(schoolClass: SchoolClassClassApp): SchoolClassClassApp {
        const copy: SchoolClassClassApp = Object.assign({}, schoolClass);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(schoolClass.date);
        return copy;
    }

    /**
     * Convert a SchoolClassClassApp to a JSON which can be sent to the server.
     */
    private convert(schoolClass: SchoolClassClassApp): SchoolClassClassApp {
        const copy: SchoolClassClassApp = Object.assign({}, schoolClass);
        copy.date = this.dateUtils
            .convertLocalDateToServer(schoolClass.date);
        return copy;
    }
}
