import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Wiss3NSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { InfoComponent } from 'app/home/info/info.component';
import { Wiss3NCalendarModule } from 'app/calendar/calendar.module';

@NgModule({
    imports: [Wiss3NSharedModule, Wiss3NCalendarModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent, InfoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NHomeModule {}
