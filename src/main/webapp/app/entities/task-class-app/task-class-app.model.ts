import { BaseEntity } from './../../shared';
import { taskTypeSetting } from '../../management/models/events';

export const enum TaskType {
    'HAUSAUFGABE',
    'VORTRAG',
    'KURZKONTROLLE',
    'TEST',
    'KLASSENARBEIT',
    'KLAUSUR',
    'MUENDLICH'
}

export class TaskClassApp implements BaseEntity {
    constructor(
        public id?: number,
        public titel?: string,
        public content?: any,
        public type?: TaskType,
        public start?: any,
        public end?: any,
        public userLogin?: string,
        public userId?: number,
        public teachingSubjectId?: number,
    ) {
    }

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
}
