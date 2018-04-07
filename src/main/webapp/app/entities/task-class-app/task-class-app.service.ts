import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TaskClassApp } from './task-class-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TaskClassApp>;

@Injectable()
export class TaskClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/tasks';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(task: TaskClassApp): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http.post<TaskClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(task: TaskClassApp): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http.put<TaskClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TaskClassApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TaskClassApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaskClassApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TaskClassApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TaskClassApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TaskClassApp[]>): HttpResponse<TaskClassApp[]> {
        const jsonResponse: TaskClassApp[] = res.body;
        const body: TaskClassApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TaskClassApp.
     */
    private convertItemFromServer(task: TaskClassApp): TaskClassApp {
        const copy: TaskClassApp = Object.assign({}, task);
        copy.start = this.dateUtils
            .convertLocalDateFromServer(task.start);
        copy.end = this.dateUtils
            .convertLocalDateFromServer(task.end);
        return copy;
    }

    /**
     * Convert a TaskClassApp to a JSON which can be sent to the server.
     */
    private convert(task: TaskClassApp): TaskClassApp {
        const copy: TaskClassApp = Object.assign({}, task);
        copy.start = this.dateUtils
            .convertLocalDateToServer(task.start);
        copy.end = this.dateUtils
            .convertLocalDateToServer(task.end);
        return copy;
    }
}
