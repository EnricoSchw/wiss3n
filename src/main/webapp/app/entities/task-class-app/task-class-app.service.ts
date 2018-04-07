import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TaskClassApp } from './task-class-app.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TaskClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/tasks';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(task: TaskClassApp): Observable<TaskClassApp> {
        const copy = this.convert(task);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(task: TaskClassApp): Observable<TaskClassApp> {
        const copy = this.convert(task);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TaskClassApp> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to TaskClassApp.
     */
    private convertItemFromServer(json: any): TaskClassApp {
        const entity: TaskClassApp = Object.assign(new TaskClassApp(), json);
        entity.start = this.dateUtils
            .convertLocalDateFromServer(json.start);
        entity.end = this.dateUtils
            .convertLocalDateFromServer(json.end);
        return entity;
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
