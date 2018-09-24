import { Injectable } from '@angular/core';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { select, Store } from '@ngrx/store';
import {
    State, selectAllTeachingSubjects,
} from 'app/store/teaching-subject/store-teaching-subject.reducer';
import {
    DeleteTeachingSubject, LoadTeachingSubjects, UpsertTeachingSubject
} from 'app/store/teaching-subject/store-teaching-subject.actions';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class StoreTeachingSubjectService {

    constructor(private store: Store<State>) {
    }

    public loadAll(teachingSubjects: ITeachingSubject[]) {
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

    public getAll(): Observable<ITeachingSubject[]> {
        return this.store.pipe(select(selectAllTeachingSubjects));
    }
}
