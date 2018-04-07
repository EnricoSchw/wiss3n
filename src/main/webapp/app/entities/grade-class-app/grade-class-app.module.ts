import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KlassenchatappSharedModule } from '../../shared';
import { KlassenchatappAdminModule } from '../../admin/admin.module';
import {
    GradeClassAppService,
    GradeClassAppPopupService,
    GradeClassAppComponent,
    GradeClassAppDetailComponent,
    GradeClassAppDialogComponent,
    GradeClassAppPopupComponent,
    GradeClassAppDeletePopupComponent,
    GradeClassAppDeleteDialogComponent,
    gradeRoute,
    gradePopupRoute,
} from './';

const ENTITY_STATES = [
    ...gradeRoute,
    ...gradePopupRoute,
];

@NgModule({
    imports: [
        KlassenchatappSharedModule,
        KlassenchatappAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GradeClassAppComponent,
        GradeClassAppDetailComponent,
        GradeClassAppDialogComponent,
        GradeClassAppDeleteDialogComponent,
        GradeClassAppPopupComponent,
        GradeClassAppDeletePopupComponent,
    ],
    entryComponents: [
        GradeClassAppComponent,
        GradeClassAppDialogComponent,
        GradeClassAppPopupComponent,
        GradeClassAppDeleteDialogComponent,
        GradeClassAppDeletePopupComponent,
    ],
    providers: [
        GradeClassAppService,
        GradeClassAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappGradeClassAppModule {}
