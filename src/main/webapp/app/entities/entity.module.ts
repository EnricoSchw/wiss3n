import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { KlassenchatappGradeClassAppModule } from './grade-class-app/grade-class-app.module';
import { KlassenchatappTaskClassAppModule } from './task-class-app/task-class-app.module';
import { KlassenchatappSchoolClassClassAppModule } from './school-class-class-app/school-class-class-app.module';
import { KlassenchatappTeachingSubjectClassAppModule } from './teaching-subject-class-app/teaching-subject-class-app.module';
import { KlassenchatappTagClassAppModule } from './tag-class-app/tag-class-app.module';
import { KlassenchatappContentClassAppModule } from './content-class-app/content-class-app.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        KlassenchatappGradeClassAppModule,
        KlassenchatappTaskClassAppModule,
        KlassenchatappSchoolClassClassAppModule,
        KlassenchatappTeachingSubjectClassAppModule,
        KlassenchatappTagClassAppModule,
        KlassenchatappContentClassAppModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappEntityModule {}
