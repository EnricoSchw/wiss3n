import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';

type EntityResponseType = HttpResponse<ITeachingHour>;
type EntityArrayResponseType = HttpResponse<ITeachingHour[]>;

@Injectable({ providedIn: 'root' })
export class TeachingHourService {
    private resourceUrl = SERVER_API_URL + 'api/teaching-hours';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/teaching-hours';

    constructor(private http: HttpClient) {}

    create(teachingHour: ITeachingHour): Observable<EntityResponseType> {
        return this.http.post<ITeachingHour>(this.resourceUrl, teachingHour, { observe: 'response' });
    }

    update(teachingHour: ITeachingHour): Observable<EntityResponseType> {
        return this.http.put<ITeachingHour>(this.resourceUrl, teachingHour, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITeachingHour>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITeachingHour[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITeachingHour[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
