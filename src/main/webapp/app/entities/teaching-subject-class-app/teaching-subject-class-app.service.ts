import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TeachingSubjectClassApp } from './teaching-subject-class-app.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TeachingSubjectClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/teaching-subjects';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(teachingSubject: TeachingSubjectClassApp): Observable<TeachingSubjectClassApp> {
        const copy = this.convert(teachingSubject);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(teachingSubject: TeachingSubjectClassApp): Observable<TeachingSubjectClassApp> {
        const copy = this.convert(teachingSubject);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TeachingSubjectClassApp> {
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
     * Convert a returned JSON object to TeachingSubjectClassApp.
     */
    private convertItemFromServer(json: any): TeachingSubjectClassApp {
        const entity: TeachingSubjectClassApp = Object.assign(new TeachingSubjectClassApp(), json);
        entity.year = this.dateUtils
            .convertLocalDateFromServer(json.year);
        return entity;
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
