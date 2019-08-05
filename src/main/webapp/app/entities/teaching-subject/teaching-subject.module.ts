import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Wiss3NSharedModule } from 'app/shared';
import { Wiss3NAdminModule } from 'app/admin/admin.module';
import {
    TeachingSubjectComponent,
    TeachingSubjectDetailComponent,
    TeachingSubjectUpdateComponent,
    TeachingSubjectDeletePopupComponent,
    TeachingSubjectDeleteDialogComponent,
    teachingSubjectRoute,
    teachingSubjectPopupRoute
} from './';
import { Wiss3NGlobalComponentModule } from 'app/global-component/global-component.module';

const ENTITY_STATES = [...teachingSubjectRoute, ...teachingSubjectPopupRoute];

@NgModule({
    imports: [Wiss3NSharedModule, Wiss3NAdminModule, Wiss3NGlobalComponentModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeachingSubjectComponent,
        TeachingSubjectDetailComponent,
        TeachingSubjectUpdateComponent,
        TeachingSubjectDeleteDialogComponent,
        TeachingSubjectDeletePopupComponent
    ],
    entryComponents: [
        TeachingSubjectComponent,
        TeachingSubjectUpdateComponent,
        TeachingSubjectDeleteDialogComponent,
        TeachingSubjectDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NTeachingSubjectModule {}
