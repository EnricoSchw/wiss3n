import { Moment } from 'moment';
import { EventColor } from 'calendar-utils';
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

    /**
     * Convert Task Type to string
     * @param {TaskType} type
     * @returns {string}
     */
    public static convertTypeToString(type: TaskType): string {
        switch (type) {
            case TaskType.HAUSAUFGABE:
            case TaskType.VORTRAG:
            case TaskType.KURZKONTROLLE:
            case TaskType.TEST:
            case TaskType.KLASSENARBEIT:
            case TaskType.KLAUSUR:
            case TaskType.MUENDLICH:
                return taskTypeSetting.get(type).prefix;
            default:
                return '';
        }
    }
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

// setting for TaskType TaskTypeSet
// ------------------------------------------------------------

export interface TaskTypeSet extends EventColor {
    prefix: string;
}

export class TaskTypeSetting {

    private list: { [type: string]: TaskTypeSet } = {  };

    get(type: TaskType): TaskTypeSet {
        return this.list[type.valueOf()];
    }

    set(type: TaskType, setting: TaskTypeSet) {
        this.list[type.valueOf()] = setting;
    }
}

export const taskTypeSetting = new TaskTypeSetting();

taskTypeSetting.set( TaskType.HAUSAUFGABE , {
    prefix: 'HA',
    primary: '#284451',
    secondary: '#59a9cb'
});

taskTypeSetting.set(TaskType.VORTRAG, {
    prefix: 'Vortrag',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.KURZKONTROLLE, {
    prefix: 'KK',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.TEST, {
    prefix: 'Test',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.KLAUSUR, {
    prefix: 'Klausur',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.MUENDLICH, {
    prefix: 'MÜ',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});
