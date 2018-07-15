import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule  as AngularCalendarModule } from 'angular-calendar';
import { CalendarBoardComponent } from './calendar-board/calendar-board.component';
import { CalendarService } from './providers/calendar.service';
import { SubjectHourViewComponent } from './calendar/subject-hour-view/subject-hour-view.component';
import { SubjectHourEventViewComponent } from './calendar/subject-hour-event-view/subject-hour-event-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        AngularCalendarModule.forRoot(),
        RouterModule
    ],
    declarations: [CalendarComponent, CalendarBoardComponent, SubjectHourViewComponent, SubjectHourEventViewComponent],
    providers: [CalendarService],
    exports: [CalendarBoardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarModule {
}
