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
import { CalendarTeachingSubjectListComponent } from './calendar-entities/calendar-teaching-subject-list.component';
import { SelectTeachingSubjectComponent } from './calendar/select-teaching-subject/select-teaching-subject.component';
import { Wiss3NStoreModule } from 'app/store/store.module';

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
        SubjectHourEventViewComponent,
        CalendarTeachingSubjectListComponent,
        SelectTeachingSubjectComponent
    ],
    providers: [CalendarService],
    exports: [CalendarBoardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NCalendarModule {
}
