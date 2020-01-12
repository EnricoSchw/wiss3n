import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { WebWiss3NSharedModule } from 'app/shared/shared.module';
import { WebWiss3NCoreModule } from 'app/core/core.module';
import { WebWiss3NAppRoutingModule } from './app-routing.module';
import { WebWiss3NHomeModule } from './home/home.module';
import { WebWiss3NEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MainAdminComponent } from './layouts/main-admin/main-admin.component';
import { MainUserComponent } from './layouts/main-user/main-user.component';
import { MainInfoComponent } from './layouts/main-info/main-info.component';
import { NavbarInfoComponent } from 'app/layouts/navbar-info/navbar-info.component';
import { NavbarUserComponent } from 'app/layouts/navbar-user/navbar-user.component';

@NgModule({
  imports: [
    BrowserModule,
    WebWiss3NSharedModule,
    WebWiss3NCoreModule,
    WebWiss3NHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    WebWiss3NEntityModule,
    WebWiss3NAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, NavbarInfoComponent, NavbarUserComponent, ErrorComponent,
    PageRibbonComponent, FooterComponent, SidebarComponent, MainAdminComponent, MainUserComponent, MainInfoComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class WebWiss3NAppModule {}
