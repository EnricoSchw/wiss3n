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
    schoolClasses?: ITeachingSubject[];
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
        public schoolClasses?: ITeachingSubject[],
        public user?: IUser
    ) {
        this.active = false;
    }
}
