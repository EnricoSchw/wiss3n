import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KlassenchatappSharedModule } from '../../shared';
import { KlassenchatappAdminModule } from '../../admin/admin.module';
import {
    TeachingSubjectClassAppService,
    TeachingSubjectClassAppPopupService,
    TeachingSubjectClassAppComponent,
    TeachingSubjectClassAppDetailComponent,
    TeachingSubjectClassAppDialogComponent,
    TeachingSubjectClassAppPopupComponent,
    TeachingSubjectClassAppDeletePopupComponent,
    TeachingSubjectClassAppDeleteDialogComponent,
    teachingSubjectRoute,
    teachingSubjectPopupRoute,
    TeachingSubjectClassAppResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...teachingSubjectRoute,
    ...teachingSubjectPopupRoute,
];

@NgModule({
    imports: [
        KlassenchatappSharedModule,
        KlassenchatappAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TeachingSubjectClassAppComponent,
        TeachingSubjectClassAppDetailComponent,
        TeachingSubjectClassAppDialogComponent,
        TeachingSubjectClassAppDeleteDialogComponent,
        TeachingSubjectClassAppPopupComponent,
        TeachingSubjectClassAppDeletePopupComponent,
    ],
    entryComponents: [
        TeachingSubjectClassAppComponent,
        TeachingSubjectClassAppDialogComponent,
        TeachingSubjectClassAppPopupComponent,
        TeachingSubjectClassAppDeleteDialogComponent,
        TeachingSubjectClassAppDeletePopupComponent,
    ],
    providers: [
        TeachingSubjectClassAppService,
        TeachingSubjectClassAppPopupService,
        TeachingSubjectClassAppResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappTeachingSubjectClassAppModule {}
