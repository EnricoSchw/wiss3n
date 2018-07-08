import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ITeachingHour } from 'app/shared/model//teaching-hour.model';
import { IContent } from 'app/shared/model//content.model';

export const enum TaskType {
    HAUSAUFGABE = 'HAUSAUFGABE',
    VORTRAG = 'VORTRAG',
    KURZKONTROLLE = 'KURZKONTROLLE',
    TEST = 'TEST',
    KLASSENARBEIT = 'KLASSENARBEIT',
    KLAUSUR = 'KLAUSUR',
    MUENDLICH = 'MUENDLICH'
}

export interface ITask {
    id?: number;
    title?: string;
    description?: any;
    type?: TaskType;
    date?: Moment;
    grade?: number;
    user?: IUser;
    teachingHour?: ITeachingHour;
    contents?: IContent[];
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public title?: string,
        public description?: any,
        public type?: TaskType,
        public date?: Moment,
        public grade?: number,
        public user?: IUser,
        public teachingHour?: ITeachingHour,
        public contents?: IContent[]
    ) {}
}
