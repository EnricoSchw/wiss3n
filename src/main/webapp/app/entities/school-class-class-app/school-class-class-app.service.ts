import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SchoolClassClassApp } from './school-class-class-app.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SchoolClassClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/school-classes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(schoolClass: SchoolClassClassApp): Observable<SchoolClassClassApp> {
        const copy = this.convert(schoolClass);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(schoolClass: SchoolClassClassApp): Observable<SchoolClassClassApp> {
        const copy = this.convert(schoolClass);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SchoolClassClassApp> {
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
     * Convert a returned JSON object to SchoolClassClassApp.
     */
    private convertItemFromServer(json: any): SchoolClassClassApp {
        const entity: SchoolClassClassApp = Object.assign(new SchoolClassClassApp(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
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
