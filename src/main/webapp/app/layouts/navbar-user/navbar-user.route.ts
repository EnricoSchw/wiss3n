import { Route } from '@angular/router';
import { NavbarUserComponent } from 'app/layouts/navbar-user/navbar-user.component';

export const navbarUserRoute: Route = {
  path: '',
  component: NavbarUserComponent,
  outlet: 'navbarUser'
};
