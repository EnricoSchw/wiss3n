import { ITeachingSubject } from 'app/shared/model//teaching-subject.model';
import { ISchoolClass } from 'app/shared/model//school-class.model';
import { ITask } from 'app/shared/model//task.model';

export interface ITeachingHour {
    id?: number;
    name?: string;
    weekday?: number;
    hour?: number;
    teachingSubject?: ITeachingSubject;
    schoolClass?: ISchoolClass;
    tasks?: ITask[];
}

export class TeachingHour implements ITeachingHour {
    constructor(
        public id?: number,
        public name?: string,
        public weekday?: number,
        public hour?: number,
        public teachingSubject?: ITeachingSubject,
        public schoolClass?: ISchoolClass,
        public tasks?: ITask[]
    ) {}
}
