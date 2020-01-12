import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebWiss3NSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [WebWiss3NSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, InfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebWiss3NHomeModule {}
