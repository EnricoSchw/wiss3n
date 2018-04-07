import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TagClassApp } from './tag-class-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TagClassApp>;

@Injectable()
export class TagClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/tags';

    constructor(private http: HttpClient) { }

    create(tag: TagClassApp): Observable<EntityResponseType> {
        const copy = this.convert(tag);
        return this.http.post<TagClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tag: TagClassApp): Observable<EntityResponseType> {
        const copy = this.convert(tag);
        return this.http.put<TagClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TagClassApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TagClassApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<TagClassApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TagClassApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TagClassApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TagClassApp[]>): HttpResponse<TagClassApp[]> {
        const jsonResponse: TagClassApp[] = res.body;
        const body: TagClassApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TagClassApp.
     */
    private convertItemFromServer(tag: TagClassApp): TagClassApp {
        const copy: TagClassApp = Object.assign({}, tag);
        return copy;
    }

    /**
     * Convert a TagClassApp to a JSON which can be sent to the server.
     */
    private convert(tag: TagClassApp): TagClassApp {
        const copy: TagClassApp = Object.assign({}, tag);
        return copy;
    }
}
