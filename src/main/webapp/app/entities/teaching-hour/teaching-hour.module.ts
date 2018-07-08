import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Wiss3NSharedModule } from 'app/shared';
import {
    TeachingHourComponent,
    TeachingHourDetailComponent,
    TeachingHourUpdateComponent,
    TeachingHourDeletePopupComponent,
    TeachingHourDeleteDialogComponent,
    teachingHourRoute,
    teachingHourPopupRoute
} from './';

const ENTITY_STATES = [...teachingHourRoute, ...teachingHourPopupRoute];

@NgModule({
    imports: [Wiss3NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeachingHourComponent,
        TeachingHourDetailComponent,
        TeachingHourUpdateComponent,
        TeachingHourDeleteDialogComponent,
        TeachingHourDeletePopupComponent
    ],
    entryComponents: [
        TeachingHourComponent,
        TeachingHourUpdateComponent,
        TeachingHourDeleteDialogComponent,
        TeachingHourDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NTeachingHourModule {}
