import { Route } from '@angular/router';

  import { NavbarInfoComponent } from 'app/layouts/navbar-info/navbar-info.component';

export const navbarInfoRoute: Route = {
    path: '',
    component: NavbarInfoComponent,
    outlet: 'navbarInfo'
};
