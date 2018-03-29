import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KlassenchatappSharedModule } from '../../shared';
import { KlassenchatappAdminModule } from '../../admin/admin.module';
import {
    ContentClassAppService,
    ContentClassAppPopupService,
    ContentClassAppComponent,
    ContentClassAppDetailComponent,
    ContentClassAppDialogComponent,
    ContentClassAppPopupComponent,
    ContentClassAppDeletePopupComponent,
    ContentClassAppDeleteDialogComponent,
    contentRoute,
    contentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contentRoute,
    ...contentPopupRoute,
];

@NgModule({
    imports: [
        KlassenchatappSharedModule,
        KlassenchatappAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContentClassAppComponent,
        ContentClassAppDetailComponent,
        ContentClassAppDialogComponent,
        ContentClassAppDeleteDialogComponent,
        ContentClassAppPopupComponent,
        ContentClassAppDeletePopupComponent,
    ],
    entryComponents: [
        ContentClassAppComponent,
        ContentClassAppDialogComponent,
        ContentClassAppPopupComponent,
        ContentClassAppDeleteDialogComponent,
        ContentClassAppDeletePopupComponent,
    ],
    providers: [
        ContentClassAppService,
        ContentClassAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappContentClassAppModule {}
