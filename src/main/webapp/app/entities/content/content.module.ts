import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Wiss3NSharedModule } from 'app/shared';
import { Wiss3NAdminModule } from 'app/admin/admin.module';
import {
    ContentComponent,
    ContentDetailComponent,
    ContentUpdateComponent,
    ContentDeletePopupComponent,
    ContentDeleteDialogComponent,
    contentRoute,
    contentPopupRoute
} from './';

const ENTITY_STATES = [...contentRoute, ...contentPopupRoute];

@NgModule({
    imports: [Wiss3NSharedModule, Wiss3NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContentComponent,
        ContentDetailComponent,
        ContentUpdateComponent,
        ContentDeleteDialogComponent,
        ContentDeletePopupComponent
    ],
    entryComponents: [ContentComponent, ContentUpdateComponent, ContentDeleteDialogComponent, ContentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NContentModule {}
