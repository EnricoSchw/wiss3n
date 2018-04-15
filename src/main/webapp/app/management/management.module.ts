import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarBoardComponent } from './calendar-board/calendar-board.component';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot()
    ],
    declarations: [CalendarComponent, CalendarBoardComponent],
    exports: [CalendarComponent, CalendarBoardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManagementModule {
}
