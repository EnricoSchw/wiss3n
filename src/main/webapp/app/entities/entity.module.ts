import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Wiss3NTaskModule } from './task/task.module';
import { Wiss3NSchoolClassModule } from './school-class/school-class.module';
import { Wiss3NTeachingSubjectModule } from './teaching-subject/teaching-subject.module';
import { Wiss3NTeachingHourModule } from './teaching-hour/teaching-hour.module';
import { Wiss3NContentModule } from './content/content.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Wiss3NTaskModule,
        Wiss3NSchoolClassModule,
        Wiss3NTeachingSubjectModule,
        Wiss3NTeachingHourModule,
        Wiss3NContentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NEntityModule {}
