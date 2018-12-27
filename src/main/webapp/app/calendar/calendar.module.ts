import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule  as AngularCalendarModule } from 'angular-calendar';
import { CalendarBoardComponent } from './components/calendar-board/calendar-board.component';
import { CalendarService } from './providers/calendar.service';
import { SubjectHourViewComponent } from './calendar/subject-hour-view/subject-hour-view.component';
import { RouterModule } from '@angular/router';
import { Wiss3NSharedModule } from 'app/shared';
import { Wiss3NStoreModule } from 'app/store/store.module';
import { CalendarMenuComponent } from './components/calendar-menu/calendar-menu.component';
import { CalendarViewMonthComponent } from './components/calendar-view-month/calendar-view-month.component';
import { CalendarViewWeekComponent } from './components/calendar-view-week/calendar-view-week.component';
import { CalendarBoardListSchoolClassComponent } from 'app/calendar/components/calendar-board-list-school-class/calendar-board-list-school-class.component';
import { CalendarBoardListTeachingSubjectComponent } from 'app/calendar/components/calendar-board-list-teaching-subject/calendar-board-list-teaching-subject.component';

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
        CalendarBoardComponent,
        CalendarBoardListSchoolClassComponent,
        CalendarBoardListTeachingSubjectComponent,
        SubjectHourViewComponent,
        CalendarMenuComponent,
        CalendarViewMonthComponent,
        CalendarViewWeekComponent,
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
