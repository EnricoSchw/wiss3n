import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KlassenchatappSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { InfoComponent } from './info/info.component';

@NgModule({
    imports: [
        KlassenchatappSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        InfoComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KlassenchatappHomeModule {}
