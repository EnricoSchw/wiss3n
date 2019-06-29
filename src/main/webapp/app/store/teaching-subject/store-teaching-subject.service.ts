import { Injectable } from '@angular/core';
import { freeTeachingSubject, ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { select, Store } from '@ngrx/store';
import {
    State, selectAllTeachingSubjects, selectAllTeachingSubjectsById, selectTeachingSubject
} from 'app/store/teaching-subject/store-teaching-subject.reducer';
import {
    DeleteTeachingSubject, DeleteTeachingSubjects, LoadTeachingSubjects, UpsertTeachingSubject, UpsertTeachingSubjects
} from 'app/store/teaching-subject/store-teaching-subject.actions';
import { Observable } from 'rxjs/Observable';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';

@Injectable({
    providedIn: 'root'
})
export class StoreTeachingSubjectService {

    constructor(
        private store: Store<State>,
    ) {
    }

    public loadAll(teachingSubjects: ITeachingSubject[]) {
        teachingSubjects = [freeTeachingSubject].concat(teachingSubjects);
        this.store.dispatch(new LoadTeachingSubjects({teachingSubjects}));
    }

    public add(teachingSubject: ITeachingSubject) {
        this.store.dispatch(new UpsertTeachingSubject({teachingSubject}));
    }

    public delete(id: number) {
        this.store.dispatch(new DeleteTeachingSubject({id}));
    }

    public upsert(teachingSubject: ITeachingSubject) {
        this.store.dispatch(new UpsertTeachingSubject({teachingSubject}));
    }

    public getList(ids: number[]): Observable<ITeachingSubject[]> {
        return this.store.pipe(select(selectAllTeachingSubjectsById(ids)));
    }

    public getAll(): Observable<ITeachingSubject[]> {
        return this.store.pipe(select(selectAllTeachingSubjects));
    }

    public upsertAll(teachingSubjects: ITeachingSubject[] | undefined) {
        this.store.dispatch(new UpsertTeachingSubjects({teachingSubjects}));
    }

    public deleteAll(ids: number[]) {
        this.store.dispatch(new DeleteTeachingSubjects({ids}));
    }

    public get(id: number) {
        return this.store.pipe(select(selectTeachingSubject(id)));
    }
}
