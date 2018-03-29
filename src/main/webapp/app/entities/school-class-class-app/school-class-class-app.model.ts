import { BaseEntity } from './../../shared';

export class SchoolClassClassApp implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public name?: string,
        public teachingSubjects?: BaseEntity[],
        public userId?: number,
    ) {
    }
}
