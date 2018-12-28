import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { ISchoolClass, SchoolClass } from 'app/shared/model/school-class.model';
import {
    DeleteSchoolClass, LoadSchoolClasses, UpsertSchoolClass
} from 'app/store/school-class/store-school-class.actions';
import { selectAllSchoolClasses, selectSchoolClass, State } from 'app/store/school-class/store-school-class.reducer';
import { StoreSchoolClass } from 'app/store/school-class/store-school-class.model';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { ITeachingHour, TeachingHour } from 'app/shared/model/teaching-hour.model';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { ITeachingSubject, TeachingSubject } from 'app/shared/model/teaching-subject.model';
import { flatMap, map } from 'rxjs/operators';

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

    public loadAll(schoolClassesOrg: ISchoolClass[]) {
        const schoolClasses = this.createStoreSchoolClassList(schoolClassesOrg);
        schoolClassesOrg.forEach(schoolClass => {
            this.upsertSubEntities(schoolClass);
        });
        this.store.dispatch(new LoadSchoolClasses({schoolClasses}));
    }

    public add(schoolClassOrg: ISchoolClass) {
        const schoolClass = this.createStoreSchoolClass(schoolClassOrg);
        this.upsertSubEntities(schoolClassOrg);
        this.store.dispatch(new UpsertSchoolClass({schoolClass}));
    }

    public delete(id: number) {
        this.store.pipe(select(selectSchoolClass(id)))
            .take(1)
            .map(schoolClass => this.deleteSubEntities(schoolClass));

        this.store.dispatch(new DeleteSchoolClass({id}));
    }

    public upsert(schoolClassOrg: ISchoolClass) {
        const schoolClass = this.createStoreSchoolClass(schoolClassOrg);
        this.upsertSubEntities(schoolClass);
        this.store.dispatch(new UpsertSchoolClass({schoolClass}));
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

    private createStoreSchoolClass(schoolClass: ISchoolClass): StoreSchoolClass {
        const teachingHourIds = this.createTeachingHours(schoolClass.teachingHours);
        const teachingSubjectIds = this.createTeachingSubjects(schoolClass.teachingSubjects);
        return new StoreSchoolClass(
            schoolClass.id,
            schoolClass.start,
            schoolClass.end,
            schoolClass.active,
            schoolClass.name,
            teachingHourIds,
            teachingSubjectIds,
            schoolClass.user
        );
    }

    private createStoreSchoolClassList(schoolClasses: ISchoolClass[]): StoreSchoolClass[] {
        const storeSchoolClasseList: StoreSchoolClass[] = [];
        schoolClasses.forEach(schoolClass => {
            const storeSchoolClass = this.createStoreSchoolClass(schoolClass);
            storeSchoolClasseList.push(storeSchoolClass);
        });
        return storeSchoolClasseList;
    }

    private createTeachingHours(teachingHours: ITeachingHour[]): number[] {
        const teachingHoursIds: number[] = [];
        if (teachingHours !== undefined && teachingHours !== null) {
            teachingHours.forEach(teachingHour => {
                teachingHoursIds.push(teachingHour.id);
            });
        }
        return teachingHoursIds;
    }

    private createTeachingSubjects(teachingSubjects: ITeachingSubject[]): number[] {
        const teachingSubjectIds: number[] = [];
        if (teachingSubjects !== undefined && teachingSubjects !== null) {
            teachingSubjects.forEach(teachingSubject => {
                teachingSubjectIds.push(teachingSubject.id);
            });
        }
        return teachingSubjectIds;
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
}
