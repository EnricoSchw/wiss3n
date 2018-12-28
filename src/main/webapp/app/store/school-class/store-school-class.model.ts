import { IUser } from 'app/core/user/user.model';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { Moment } from 'moment';

export class StoreSchoolClass implements ISchoolClass {
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
