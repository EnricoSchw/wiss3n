import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot()
    ],
    declarations: [CalendarComponent],
    exports: [CalendarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManagementModule {
}
