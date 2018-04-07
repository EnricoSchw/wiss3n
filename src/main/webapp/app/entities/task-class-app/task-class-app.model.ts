import { BaseEntity } from './../../shared';

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
        public userId?: number,
        public teachingSubjectId?: number,
    ) {
    }
}
