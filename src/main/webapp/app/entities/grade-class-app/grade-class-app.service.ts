import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { GradeClassApp } from './grade-class-app.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GradeClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/grades';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(grade: GradeClassApp): Observable<GradeClassApp> {
        const copy = this.convert(grade);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(grade: GradeClassApp): Observable<GradeClassApp> {
        const copy = this.convert(grade);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GradeClassApp> {
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
     * Convert a returned JSON object to GradeClassApp.
     */
    private convertItemFromServer(json: any): GradeClassApp {
        const entity: GradeClassApp = Object.assign(new GradeClassApp(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
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
