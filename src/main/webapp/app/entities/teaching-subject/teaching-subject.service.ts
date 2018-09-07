import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';

type EntityResponseType = HttpResponse<ITeachingSubject>;
type EntityArrayResponseType = HttpResponse<ITeachingSubject[]>;

@Injectable({ providedIn: 'root' })
export class TeachingSubjectService {
    private resourceUrl = SERVER_API_URL + 'api/teaching-subjects';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/teaching-subjects';

    constructor(private http: HttpClient, private store: StoreTeachingSubjectService) {}

    create(teachingSubject: ITeachingSubject): Observable<EntityResponseType> {
        return this.http
            .post<ITeachingSubject>(this.resourceUrl, teachingSubject, { observe: 'response' })
            .map((res: HttpResponse<ITeachingSubject>) => {
                this.store.add(res.body);
                return res;
            });
    }

    update(teachingSubject: ITeachingSubject): Observable<EntityResponseType> {
        return this.http.put<ITeachingSubject>(this.resourceUrl, teachingSubject, { observe: 'response' })
            .map((res: HttpResponse<ITeachingSubject>) => {
                this.store.upsert(res.body);
                return res;
            });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITeachingSubject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITeachingSubject[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<ITeachingSubject>) => {
                this.store.delete(id);
                return res;
            });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITeachingSubject[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    public findBySchoolClassId(id: number): Observable<EntityArrayResponseType> {
        const resourceSearchBySchoolClassUrl = `api/_search/school-classes/${id}/teaching-subjects`;
        return this.http.get<ITeachingSubject[]>(SERVER_API_URL + resourceSearchBySchoolClassUrl, { observe: 'response' })
            .map((res: HttpResponse<ITeachingSubject[]>) => {
                this.store.loadAll(res.body);
                return res;
            });
    }
}
