import { BaseEntity } from './../../shared';

export class TeachingSubjectClassApp implements BaseEntity {
    constructor(
        public id?: number,
        public year?: any,
        public name?: string,
        public grade?: number,
        public userId?: number,
        public tags?: BaseEntity[],
        public schoolClassId?: number,
    ) {
    }
}
