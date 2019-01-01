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
    ) {
    }
}

export class StoreTeachingHour implements ITeachingHour {

    public static fromTeachingHour(teachingHour: TeachingHour | StoreTeachingHour): StoreTeachingHour {
        if (teachingHour instanceof StoreTeachingHour) {
            return teachingHour;
        }

        const teachingSubjectId = (teachingHour.teachingSubject !== undefined && teachingHour.teachingSubject !== null)
            ? teachingHour.teachingSubject.id
            : -1;
        const schoolClassId = (teachingHour.schoolClass !== undefined && teachingHour.schoolClass !== null)
            ? teachingHour.schoolClass.id
            : -1;

        const taskIds = this.readTasks(teachingHour.tasks);
        return new StoreTeachingHour(
            teachingHour.id,
            teachingHour.name,
            teachingHour.weekday,
            teachingHour.hour,
            teachingSubjectId,
            schoolClassId,
            taskIds
        );
    }

    private static readTasks(tasks: ITask[] | null | undefined): number[] {
        const ids = [];
        if (tasks !== undefined && tasks !== null && tasks.length > 0) {
            tasks.forEach(task => {
                ids.push(task.id);
            });
        }
        return ids;
    }

    constructor(
        public id?: number,
        public name?: string,
        public weekday?: number,
        public hour?: number,
        public teachingSubjectId?: number,
        public schoolClassId?: number,
        public taskIds?: number[]
    ) {
    }
}
