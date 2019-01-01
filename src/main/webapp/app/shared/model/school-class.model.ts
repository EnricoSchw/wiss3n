import { Moment } from 'moment';
import { ITeachingHour } from 'app/shared/model//teaching-hour.model';
import { ITeachingSubject } from 'app/shared/model//teaching-subject.model';
import { IUser } from 'app/core/user/user.model';

export interface ISchoolClass {
    id?: number;
    start?: Moment;
    end?: Moment;
    active?: boolean;
    name?: string;
    teachingHours?: ITeachingHour[];
    teachingSubjects?: ITeachingSubject[];
    user?: IUser;
}

export class SchoolClass implements ISchoolClass {
    constructor(
        public id?: number,
        public start?: Moment,
        public end?: Moment,
        public active?: boolean,
        public name?: string,
        public teachingHours?: ITeachingHour[],
        public teachingSubjects?: ITeachingSubject[],
        public user?: IUser
    ) {
        this.active = false;
    }
}

export class StoreSchoolClass implements ISchoolClass {

    public static fromSchoolClass(schoolClass: SchoolClass | StoreSchoolClass): StoreSchoolClass {
        if (schoolClass instanceof StoreSchoolClass) {
            return schoolClass;
        }

        const teachingHourIds = this.createTeachingHourIds(schoolClass.teachingHours);
        const teachingSubjectIds = this.createTeachingSubjectIds(schoolClass.teachingSubjects);
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

    private static createTeachingHourIds(teachingHours: ITeachingHour[] | undefined | null): number[] {
        const teachingHoursIds: number[] = [];
        if (teachingHours !== undefined && teachingHours !== null) {
            teachingHours.forEach(teachingHour => teachingHoursIds.push(teachingHour.id));
        }
        return teachingHoursIds;
    }

    private static createTeachingSubjectIds(teachingSubjects: ITeachingSubject[] | undefined | null): number[] {
        const teachingSubjectIds: number[] = [];
        if (teachingSubjects !== undefined && teachingSubjects !== null && teachingSubjects.length > 0) {
            teachingSubjects.forEach(teachingSubject => teachingSubjectIds.push(teachingSubject.id));
        }
        return teachingSubjectIds;
    }

    constructor(
        public id: number,
        public start: Moment,
        public end: Moment,
        public active: boolean,
        public name: string,
        public teachingHourIds: number[],
        public teachingSubjectIds: number[],
        public user?: IUser
    ) {
        this.active = true;
    }
}
