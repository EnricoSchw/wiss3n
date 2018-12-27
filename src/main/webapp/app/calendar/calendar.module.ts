import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule  as AngularCalendarModule } from 'angular-calendar';
import { CalendarBoardComponent } from './components/calendar-board/calendar-board.component';
import { CalendarService } from './providers/calendar.service';
import { SubjectHourViewComponent } from './calendar/subject-hour-view/subject-hour-view.component';
import { SubjectHourEventViewComponent } from './calendar/subject-hour-event-view/subject-hour-event-view.component';
import { RouterModule } from '@angular/router';
import { CalendarSchoolClassListComponent } from './components/calendar-school-class-list/calendar-school-class-list.component';
import { Wiss3NSharedModule } from 'app/shared';
import { CalendarTeachingSubjectListComponent } from './components/calendar-teaching-subject-list/calendar-teaching-subject-list.component';
import { Wiss3NStoreModule } from 'app/store/store.module';
import { CalendarMenuComponent } from './components/calendar-menu/calendar-menu.component';
import { CalendarViewMonthComponent } from './components/calendar-view-month/calendar-view-month.component';

@NgModule({
    imports: [
        CommonModule,
        AngularCalendarModule.forRoot(),
        RouterModule,
        Wiss3NSharedModule,
        Wiss3NStoreModule
    ],
    declarations: [
        CalendarComponent,
        CalendarSchoolClassListComponent,
        CalendarBoardComponent,
        SubjectHourViewComponent,
        CalendarMenuComponent,
        CalendarViewMonthComponent,
        // SubjectHourEventViewComponent,
        // CalendarTeachingSubjectListComponent,
        // SelectTeachingSubjectComponent
    ],
    providers: [CalendarService],
    exports: [CalendarBoardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NCalendarModule {
}
