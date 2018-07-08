import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ITask } from 'app/shared/model//task.model';

export interface IContent {
    id?: number;
    title?: string;
    date?: Moment;
    text?: any;
    user?: IUser;
    task?: ITask;
}

export class Content implements IContent {
    constructor(
        public id?: number,
        public title?: string,
        public date?: Moment,
        public text?: any,
        public user?: IUser,
        public task?: ITask
    ) {}
}
