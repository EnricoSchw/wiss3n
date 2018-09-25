import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import {
    DeleteSchoolClass, LoadSchoolClasses, UpsertSchoolClass
} from 'app/store/school-class/store-school-class.actions';
import { selectAllSchoolClasses, selectSchoolClass, State } from 'app/store/school-class/store-school-class.reducer';

@Injectable({
  providedIn: 'root'
})
export class StoreSchoolClassService {

    constructor(private store: Store<State>) {
    }

    public loadAll(schoolClasses: ISchoolClass[]) {
        this.store.dispatch(new LoadSchoolClasses({schoolClasses}));
    }

    public add(schoolClass: ISchoolClass) {
        this.store.dispatch(new UpsertSchoolClass({schoolClass}));
    }

    public delete(id: number) {
        this.store.dispatch(new DeleteSchoolClass({id}));
    }

    public upsert(schoolClass: ISchoolClass) {
        this.store.dispatch(new UpsertSchoolClass({schoolClass}));
    }

    public getAll(): Observable<ISchoolClass[]> {
        return this.store.pipe(select(selectAllSchoolClasses));
    }

    public get(id: number): Observable<ISchoolClass> {
        return this.store.pipe(select(selectSchoolClass(id)));
    }
}
