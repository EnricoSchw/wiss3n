import { BaseEntity } from './../../shared';

export class TagClassApp implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
