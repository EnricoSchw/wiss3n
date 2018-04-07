import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { KlassenchatappSharedModule, UserRouteAccessService } from './shared';
import { KlassenchatappAppRoutingModule} from './app-routing.module';
import { KlassenchatappHomeModule } from './home/home.module';
import { KlassenchatappAdminModule } from './admin/admin.module';
import { KlassenchatappAccountModule } from './account/account.module';
import { KlassenchatappEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        KlassenchatappAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        KlassenchatappSharedModule,
        KlassenchatappHomeModule,
        KlassenchatappAdminModule,
        KlassenchatappAccountModule,
        KlassenchatappEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class KlassenchatappAppModule {}
