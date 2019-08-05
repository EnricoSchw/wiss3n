import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Wiss3NSharedModule } from 'app/shared';
import { Wiss3NAdminModule } from 'app/admin/admin.module';
import {
    SchoolClassComponent,
    SchoolClassDetailComponent,
    SchoolClassUpdateComponent,
    SchoolClassDeletePopupComponent,
    SchoolClassDeleteDialogComponent,
    schoolClassRoute,
    schoolClassPopupRoute
} from './';
import { Wiss3NGlobalComponentModule } from 'app/global-component/global-component.module';

const ENTITY_STATES = [...schoolClassRoute, ...schoolClassPopupRoute];

@NgModule({
    imports: [Wiss3NSharedModule, Wiss3NAdminModule, Wiss3NGlobalComponentModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SchoolClassComponent,
        SchoolClassDetailComponent,
        SchoolClassUpdateComponent,
        SchoolClassDeleteDialogComponent,
        SchoolClassDeletePopupComponent
    ],
    entryComponents: [SchoolClassComponent, SchoolClassUpdateComponent, SchoolClassDeleteDialogComponent, SchoolClassDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: []
})
export class Wiss3NSchoolClassModule {}
