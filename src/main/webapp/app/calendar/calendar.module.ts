import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule  as AngularCalendarModule } from 'angular-calendar';
import { CalendarBoardComponent } from './calendar-board/calendar-board.component';
import { CalendarService } from './providers/calendar.service';
import { SubjectHourViewComponent } from './calendar/subject-hour-view/subject-hour-view.component';
import { SubjectHourEventViewComponent } from './calendar/subject-hour-event-view/subject-hour-event-view.component';
import { RouterModule } from '@angular/router';
import { CalendarSchoolClassListComponent } from './calendar-entities/calendar-school-class-list.component';
import { Wiss3NSharedModule } from 'app/shared';
import { EntityMapperService } from 'app/calendar/providers/entity-mapper.service';

@NgModule({
    imports: [
        CommonModule,
        AngularCalendarModule.forRoot(),
        RouterModule,
        Wiss3NSharedModule
    ],
    declarations: [CalendarComponent, CalendarSchoolClassListComponent, CalendarBoardComponent, SubjectHourViewComponent, SubjectHourEventViewComponent],
    providers: [CalendarService, EntityMapperService],
    exports: [CalendarBoardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NCalendarModule {
}
