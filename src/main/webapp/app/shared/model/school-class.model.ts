import { Moment } from 'moment';
import { ITeachingHour } from 'app/shared/model//teaching-hour.model';
import { IUser } from 'app/core/user/user.model';

export interface ISchoolClass {
    id?: number;
    start?: Moment;
    end?: Moment;
    name?: string;
    teachingHours?: ITeachingHour[];
    user?: IUser;
}

export class SchoolClass implements ISchoolClass {
    constructor(
        public id?: number,
        public start?: Moment,
        public end?: Moment,
        public name?: string,
        public teachingHours?: ITeachingHour[],
        public user?: IUser
    ) {}
}
