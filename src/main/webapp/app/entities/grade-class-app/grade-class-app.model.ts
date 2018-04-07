import { BaseEntity } from './../../shared';

export const enum GradeAdditional {
    'PLUS',
    'MINUS'
}

export class GradeClassApp implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public value?: number,
        public additional?: GradeAdditional,
        public point?: number,
        public taskId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
    }
}
