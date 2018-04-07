import { BaseEntity } from './../../shared';

export class ContentClassApp implements BaseEntity {
    constructor(
        public id?: number,
        public titel?: string,
        public text?: any,
        public userId?: number,
        public taskId?: number,
        public tags?: BaseEntity[],
    ) {
    }
}
