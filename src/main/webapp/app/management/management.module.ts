import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarBoardComponent } from './calendar-board/calendar-board.component';
import { CalendarService } from './providers/calendar.service';
import { CustomCalendarWeekViewComponent } from './calendar/week/custom-calendar-week-view/custom-calendar-week-view.component';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot()
    ],
    declarations: [CalendarComponent, CalendarBoardComponent, CustomCalendarWeekViewComponent],
    providers: [CalendarService],
    exports: [CalendarBoardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManagementModule {
}
