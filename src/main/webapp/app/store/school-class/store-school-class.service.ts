import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { ISchoolClass, SchoolClass, StoreSchoolClass } from 'app/shared/model/school-class.model';
import {
    ActivateSchoolClass,
    DeleteSchoolClass, LoadSchoolClasses, UpsertSchoolClass
} from 'app/store/school-class/store-school-class.actions';
import {
    selectActiveSchoolClass, selectActiveSchoolClassId, selectAllSchoolClasses, selectSchoolClass, State
} from 'app/store/school-class/store-school-class.reducer';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { TeachingHour } from 'app/shared/model/teaching-hour.model';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { TeachingSubject } from 'app/shared/model/teaching-subject.model';
import { filter, flatMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StoreSchoolClassService {

    constructor(
        private store: Store<State>,
        private teachingHourService: StoreTeachingHourService,
        private teachingSubjectService: StoreTeachingSubjectService
    ) {
    }

    public loadAll(schoolClasses: ISchoolClass[]) {
        schoolClasses.forEach(schoolClass => {
            this.upsertSubEntities(schoolClass);
        });
        this.store.dispatch(new LoadSchoolClasses({schoolClasses: this.mapToStoreEntityList(schoolClasses)}));
    }

    public add(schoolClass: ISchoolClass) {
        this.upsertSubEntities(schoolClass);
        this.store.dispatch(new UpsertSchoolClass({schoolClass: StoreSchoolClass.fromSchoolClass(schoolClass)}));
    }

    public delete(id: number) {
        this.store.pipe(select(selectSchoolClass(id)))
            .take(1)
            .map(schoolClass => this.deleteSubEntities(schoolClass));

        this.store.dispatch(new DeleteSchoolClass({id}));
    }

    public upsert(schoolClass: ISchoolClass) {
        this.upsertSubEntities(schoolClass);
        this.store.dispatch(new UpsertSchoolClass({schoolClass: StoreSchoolClass.fromSchoolClass(schoolClass)}));
    }

    public getAll(): Observable<ISchoolClass[]> {
        return this.store.pipe(select(selectAllSchoolClasses));
    }

    public get(id: number): Observable<ISchoolClass> {
        return this.store.pipe(
            select(selectSchoolClass(id)),
            flatMap(schoolClass => this.createSchoolClass(schoolClass))
        );
    }

    private createSchoolClass(storeSchoolClass: StoreSchoolClass): Observable<ISchoolClass> {
        const schoolClass = new SchoolClass(
            storeSchoolClass.id,
            storeSchoolClass.start,
            storeSchoolClass.end,
            storeSchoolClass.active,
            storeSchoolClass.name,
            [],
            [],
            storeSchoolClass.user
        );

        return this.readTeachingHours(storeSchoolClass)
            .pipe(
                map(teachingHours => schoolClass.teachingHours = teachingHours),
                flatMap(() => this.readTeachingSubjects(storeSchoolClass)),
                map(teachingSubjects => schoolClass.teachingSubjects = teachingSubjects),
                map(() => schoolClass)
            );
    }

    private upsertSubEntities(schoolClass: ISchoolClass) {
        if (schoolClass.teachingSubjects !== undefined && schoolClass.teachingSubjects !== null && schoolClass.teachingSubjects.length > 0) {
            this.teachingSubjectService.upsertAll(schoolClass.teachingSubjects);
        }
        if (schoolClass.teachingHours !== undefined && schoolClass.teachingHours !== null && schoolClass.teachingHours.length > 0) {
            this.teachingHourService.upsertAll(schoolClass.teachingHours);
        }
    }

    private deleteSubEntities(schoolClass: StoreSchoolClass) {
        if (schoolClass.teachingSubjectIds !== undefined && schoolClass.teachingSubjectIds !== null && schoolClass.teachingSubjectIds.length > 0) {
            this.teachingSubjectService.deleteAll(schoolClass.teachingSubjectIds);
        }
        if (schoolClass.teachingHourIds !== undefined && schoolClass.teachingHourIds !== null && schoolClass.teachingHourIds.length > 0) {
            this.teachingHourService.deleteAll(schoolClass.teachingHourIds);
        }
    }

    private readTeachingSubjects(schoolClass: StoreSchoolClass): Observable<TeachingSubject[]> {
        if (schoolClass.teachingSubjectIds !== undefined && schoolClass.teachingSubjectIds !== null && schoolClass.teachingSubjectIds.length > 0) {
            return this.teachingSubjectService
                .getList(schoolClass.teachingSubjectIds)
                .take(1);
        } else {
            return Observable.of([]);
        }
    }

    private readTeachingHours(schoolClass: StoreSchoolClass): Observable<TeachingHour[]> {
        if (schoolClass.teachingHourIds !== undefined && schoolClass.teachingHourIds !== null && schoolClass.teachingHourIds.length > 0) {
            return this.teachingHourService
                .getList(schoolClass.teachingHourIds)
                .take(1);
        } else {
            return Observable.of([]);
        }
    }

    public getActiveSchoolClass(): Observable<ISchoolClass> {
        return this.store
            .pipe(
                select(selectActiveSchoolClass),
                filter(s => s !== null && s !== undefined),
                flatMap(schoolClass => this.createSchoolClass(schoolClass))
            );
    }

    public activateBySchoolClassId(id: number) {
        this.store.dispatch(new ActivateSchoolClass({id}));
    }

    public getActiveSchoolClassId(): Observable<number> {
        return this.store.pipe(select(selectActiveSchoolClassId));
    }

    private mapToStoreEntityList(schoolClasses: ISchoolClass[]): StoreSchoolClass[] {
        const list: StoreSchoolClass[] = [];
        schoolClasses.forEach(schoolClass => list.push(StoreSchoolClass.fromSchoolClass(schoolClass)));
        return list;
    }
}
