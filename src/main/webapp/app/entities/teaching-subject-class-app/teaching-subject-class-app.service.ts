import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TeachingSubjectClassApp } from './teaching-subject-class-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TeachingSubjectClassApp>;

@Injectable()
export class TeachingSubjectClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/teaching-subjects';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(teachingSubject: TeachingSubjectClassApp): Observable<EntityResponseType> {
        const copy = this.convert(teachingSubject);
        return this.http.post<TeachingSubjectClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(teachingSubject: TeachingSubjectClassApp): Observable<EntityResponseType> {
        const copy = this.convert(teachingSubject);
        return this.http.put<TeachingSubjectClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TeachingSubjectClassApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TeachingSubjectClassApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<TeachingSubjectClassApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TeachingSubjectClassApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TeachingSubjectClassApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TeachingSubjectClassApp[]>): HttpResponse<TeachingSubjectClassApp[]> {
        const jsonResponse: TeachingSubjectClassApp[] = res.body;
        const body: TeachingSubjectClassApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TeachingSubjectClassApp.
     */
    private convertItemFromServer(teachingSubject: TeachingSubjectClassApp): TeachingSubjectClassApp {
        const copy: TeachingSubjectClassApp = Object.assign({}, teachingSubject);
        copy.year = this.dateUtils
            .convertLocalDateFromServer(teachingSubject.year);
        return copy;
    }

    /**
     * Convert a TeachingSubjectClassApp to a JSON which can be sent to the server.
     */
    private convert(teachingSubject: TeachingSubjectClassApp): TeachingSubjectClassApp {
        const copy: TeachingSubjectClassApp = Object.assign({}, teachingSubject);
        copy.year = this.dateUtils
            .convertLocalDateToServer(teachingSubject.year);
        return copy;
    }
}
