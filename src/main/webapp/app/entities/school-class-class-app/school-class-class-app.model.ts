import { BaseEntity } from './../../shared';

export class SchoolClassClassApp implements BaseEntity {
    constructor(
        public id?: number,
        public start?: any,
        public end?: any,
        public name?: string,
        public teachingSubjects?: BaseEntity[],
        public userLogin?: string,
        public userId?: number,
    ) {
    }
}
