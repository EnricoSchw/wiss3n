import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KlassenchatappSharedModule } from '../../shared';
import { KlassenchatappAdminModule } from '../../admin/admin.module';
import {
    SchoolClassClassAppService,
    SchoolClassClassAppPopupService,
    SchoolClassClassAppComponent,
    SchoolClassClassAppDetailComponent,
    SchoolClassClassAppDialogComponent,
    SchoolClassClassAppPopupComponent,
    SchoolClassClassAppDeletePopupComponent,
    SchoolClassClassAppDeleteDialogComponent,
    schoolClassRoute,
    schoolClassPopupRoute,
    SchoolClassClassAppResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...schoolClassRoute,
    ...schoolClassPopupRoute,
];

@NgModule({
    imports: [
        KlassenchatappSharedModule,
        KlassenchatappAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SchoolClassClassAppComponent,
        SchoolClassClassAppDetailComponent,
        SchoolClassClassAppDialogComponent,
        SchoolClassClassAppDeleteDialogComponent,
        SchoolClassClassAppPopupComponent,
        SchoolClassClassAppDeletePopupComponent,
    ],
    entryComponents: [
        SchoolClassClassAppComponent,
        SchoolClassClassAppDialogComponent,
        SchoolClassClassAppPopupComponent,
        SchoolClassClassAppDeleteDialogComponent,
        SchoolClassClassAppDeletePopupComponent,
    ],
    providers: [
        SchoolClassClassAppService,
        SchoolClassClassAppPopupService,
        SchoolClassClassAppResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappSchoolClassClassAppModule {}
