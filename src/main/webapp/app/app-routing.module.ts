import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { navbarInfoRoute } from './layouts/navbar-info/navbar-info.route';
import { navbarUserRoute } from './layouts/navbar-user/navbar-user.route';
import { sidebarRoute } from './layouts/sidebar/sidebar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, navbarInfoRoute, navbarUserRoute, navbarInfoRoute, sidebarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.WebWiss3NAdminModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.WebWiss3NAccountModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class WebWiss3NAppRoutingModule {}
