import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ContentClassApp } from './content-class-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ContentClassApp>;

@Injectable()
export class ContentClassAppService {

    private resourceUrl =  SERVER_API_URL + 'api/contents';

    constructor(private http: HttpClient) { }

    create(content: ContentClassApp): Observable<EntityResponseType> {
        const copy = this.convert(content);
        return this.http.post<ContentClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(content: ContentClassApp): Observable<EntityResponseType> {
        const copy = this.convert(content);
        return this.http.put<ContentClassApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ContentClassApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ContentClassApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<ContentClassApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ContentClassApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ContentClassApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ContentClassApp[]>): HttpResponse<ContentClassApp[]> {
        const jsonResponse: ContentClassApp[] = res.body;
        const body: ContentClassApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ContentClassApp.
     */
    private convertItemFromServer(content: ContentClassApp): ContentClassApp {
        const copy: ContentClassApp = Object.assign({}, content);
        return copy;
    }

    /**
     * Convert a ContentClassApp to a JSON which can be sent to the server.
     */
    private convert(content: ContentClassApp): ContentClassApp {
        const copy: ContentClassApp = Object.assign({}, content);
        return copy;
    }
}
