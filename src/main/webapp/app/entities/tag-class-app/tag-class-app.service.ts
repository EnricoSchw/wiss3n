import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TagClassApp } from './tag-class-app.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TagClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/tags';

    constructor(private http: Http) { }

    create(tag: TagClassApp): Observable<TagClassApp> {
        const copy = this.convert(tag);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tag: TagClassApp): Observable<TagClassApp> {
        const copy = this.convert(tag);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TagClassApp> {
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
     * Convert a returned JSON object to TagClassApp.
     */
    private convertItemFromServer(json: any): TagClassApp {
        const entity: TagClassApp = Object.assign(new TagClassApp(), json);
        return entity;
    }

    /**
     * Convert a TagClassApp to a JSON which can be sent to the server.
     */
    private convert(tag: TagClassApp): TagClassApp {
        const copy: TagClassApp = Object.assign({}, tag);
        return copy;
    }
}
