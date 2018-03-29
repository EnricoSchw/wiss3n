import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KlassenchatappSharedModule } from '../../shared';
import { KlassenchatappAdminModule } from '../../admin/admin.module';
import {
    TaskClassAppService,
    TaskClassAppPopupService,
    TaskClassAppComponent,
    TaskClassAppDetailComponent,
    TaskClassAppDialogComponent,
    TaskClassAppPopupComponent,
    TaskClassAppDeletePopupComponent,
    TaskClassAppDeleteDialogComponent,
    taskRoute,
    taskPopupRoute,
} from './';

const ENTITY_STATES = [
    ...taskRoute,
    ...taskPopupRoute,
];

@NgModule({
    imports: [
        KlassenchatappSharedModule,
        KlassenchatappAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TaskClassAppComponent,
        TaskClassAppDetailComponent,
        TaskClassAppDialogComponent,
        TaskClassAppDeleteDialogComponent,
        TaskClassAppPopupComponent,
        TaskClassAppDeletePopupComponent,
    ],
    entryComponents: [
        TaskClassAppComponent,
        TaskClassAppDialogComponent,
        TaskClassAppPopupComponent,
        TaskClassAppDeleteDialogComponent,
        TaskClassAppDeletePopupComponent,
    ],
    providers: [
        TaskClassAppService,
        TaskClassAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappTaskClassAppModule {}
