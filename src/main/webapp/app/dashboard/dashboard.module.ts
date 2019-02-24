import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Wiss3NSharedModule } from 'app/shared';
import { Wiss3NCalendarModule } from 'app/calendar/calendar.module';
import { DashboardComponent } from 'app/dashboard/dashboard.component';

@NgModule({
    imports: [Wiss3NSharedModule, Wiss3NCalendarModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NDashboardModule {}
