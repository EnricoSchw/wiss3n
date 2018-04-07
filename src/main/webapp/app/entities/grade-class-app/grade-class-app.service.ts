import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { GradeClassApp } from './grade-class-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GradeClassApp>;

@Injectable()
export class GradeClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/grades';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(grade: GradeClassApp): Observable<EntityResponseType> {
        const copy = this.convert(grade);
        return this.http.post<GradeClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(grade: GradeClassApp): Observable<EntityResponseType> {
        const copy = this.convert(grade);
        return this.http.put<GradeClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GradeClassApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GradeClassApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<GradeClassApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GradeClassApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GradeClassApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GradeClassApp[]>): HttpResponse<GradeClassApp[]> {
        const jsonResponse: GradeClassApp[] = res.body;
        const body: GradeClassApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GradeClassApp.
     */
    private convertItemFromServer(grade: GradeClassApp): GradeClassApp {
        const copy: GradeClassApp = Object.assign({}, grade);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(grade.date);
        return copy;
    }

    /**
     * Convert a GradeClassApp to a JSON which can be sent to the server.
     */
    private convert(grade: GradeClassApp): GradeClassApp {
        const copy: GradeClassApp = Object.assign({}, grade);
        copy.date = this.dateUtils
            .convertLocalDateToServer(grade.date);
        return copy;
    }
}
