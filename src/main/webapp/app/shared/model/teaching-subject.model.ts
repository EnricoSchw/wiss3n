import { IUser } from 'app/core/user/user.model';
import { ITeachingHour } from 'app/shared/model//teaching-hour.model';

export const enum SubjectType {
    HAUPFACH = 'HAUPFACH',
    NEBENFACH = 'NEBENFACH'
}

export interface ITeachingSubject {
    id?: number;
    name?: string;
    prefix?: string;
    type?: SubjectType;
    user?: IUser;
    teachingHours?: ITeachingHour[];
}

export class TeachingSubject implements ITeachingSubject {
    constructor(
        public id?: number,
        public name?: string,
        public prefix?: string,
        public type?: SubjectType,
        public user?: IUser,
        public teachingHours?: ITeachingHour[]
    ) {}
}
