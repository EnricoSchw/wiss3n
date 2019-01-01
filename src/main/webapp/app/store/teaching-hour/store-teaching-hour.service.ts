import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    State, selectAllTeachingHours, selectAllTeachingHoursById, selectTeachingHour
} from 'app/store/teaching-hour/store-teaching-hour.reducer';
import {
    DeleteTeachingHour, DeleteTeachingHours, LoadTeachingHours, UpsertTeachingHour, UpsertTeachingHours
} from 'app/store/teaching-hour/store-teaching-hour.actions';
import { Observable } from 'rxjs/Observable';
import { ITeachingHour, StoreTeachingHour } from 'app/shared/model/teaching-hour.model';

@Injectable({
    providedIn: 'root'
})
export class StoreTeachingHourService {

    constructor(private store: Store<State>) {
    }

    public loadAll(teachingHours: ITeachingHour[]) {
        this.store.dispatch(new LoadTeachingHours({teachingHours: this.mapToStoreEntityList(teachingHours)}));
    }

    public add(teachingHour: ITeachingHour) {
        this.store.dispatch(new UpsertTeachingHour({teachingHour: StoreTeachingHour.fromTeachingHour(teachingHour)}));
    }

    public delete(id: number) {
        this.store.dispatch(new DeleteTeachingHour({id}));
    }

    public upsert(teachingHour: ITeachingHour) {
        this.store.dispatch(new UpsertTeachingHour({teachingHour: StoreTeachingHour.fromTeachingHour(teachingHour)}));
    }

    public getAll(): Observable<ITeachingHour[]> {
        return this.store.pipe(select(selectAllTeachingHours));
    }

    public upsertAll(teachingHours: ITeachingHour[] | undefined) {
        this.store.dispatch(new UpsertTeachingHours({teachingHours: this.mapToStoreEntityList(teachingHours)}));
    }

    public deleteAll(ids: number[]) {
        this.store.dispatch(new DeleteTeachingHours({ids}));
    }

    public getList(ids: number[]) {
        return this.store.pipe(select(selectAllTeachingHoursById(ids)));
    }

    public get(id: number): Observable<StoreTeachingHour> {
        return this.store.pipe(select(selectTeachingHour(id)));
    }

    private mapToStoreEntityList(teachingHoursOrig: ITeachingHour[]): StoreTeachingHour[] {
        const list: StoreTeachingHour[] = [];
        teachingHoursOrig.forEach(teachingHour => list.push(StoreTeachingHour.fromTeachingHour(teachingHour)));
        return list;
    }
}
