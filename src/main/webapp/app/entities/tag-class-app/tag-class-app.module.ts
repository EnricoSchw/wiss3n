import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KlassenchatappSharedModule } from '../../shared';
import {
    TagClassAppService,
    TagClassAppPopupService,
    TagClassAppComponent,
    TagClassAppDetailComponent,
    TagClassAppDialogComponent,
    TagClassAppPopupComponent,
    TagClassAppDeletePopupComponent,
    TagClassAppDeleteDialogComponent,
    tagRoute,
    tagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tagRoute,
    ...tagPopupRoute,
];

@NgModule({
    imports: [
        KlassenchatappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagClassAppComponent,
        TagClassAppDetailComponent,
        TagClassAppDialogComponent,
        TagClassAppDeleteDialogComponent,
        TagClassAppPopupComponent,
        TagClassAppDeletePopupComponent,
    ],
    entryComponents: [
        TagClassAppComponent,
        TagClassAppDialogComponent,
        TagClassAppPopupComponent,
        TagClassAppDeleteDialogComponent,
        TagClassAppDeletePopupComponent,
    ],
    providers: [
        TagClassAppService,
        TagClassAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappTagClassAppModule {}
