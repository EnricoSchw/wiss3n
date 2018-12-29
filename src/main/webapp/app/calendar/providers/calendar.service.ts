import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs/Observable';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { StoreCalendarLessonDataService } from 'app/store/calendar-lesson-data/store-calendar-lesson-data.service';
import { CalendarLesson, getWeekdayByNumber } from 'app/shared/model/calendar-lesson-data.model';
import { RRule } from 'rrule';
import { map } from 'rxjs/operators';
import {
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { SchoolClass } from 'app/shared/model/school-class.model';
import { CalendarLessonDataService } from 'app/entities/calendar-lesson-data';
import { DateFormatter } from 'app/shared/util/date-formatter';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Injectable()
export class CalendarService {
    constructor(
        private calendarStore: StoreCalendarLessonDataService,
        private teachingHourService: StoreTeachingHourService,
        private schoolClassService: StoreSchoolClassService,
        private calendarLessonService: CalendarLessonDataService
    ) {
    }

    loadLessonEvents(): Observable<CalendarEvent<CalendarLesson>[]> {
        return this.schoolClassService
            .getActiveSchoolClass()
            .pipe(
                map(schoolClass => this.createCalendarLessonEvents(schoolClass))
            );
    }

    private createCalendarLessonEvents(schoolClass: SchoolClass): CalendarEvent<CalendarLesson>[] {
        const events: CalendarEvent<CalendarLesson>[] = [];

        schoolClass.teachingHours.forEach(teachingHour => {
            const lesson = this.calendarLessonService.createCalendarLesson(teachingHour);
            const weeklyDates: RRule = this.createRecursWeeklyRule(schoolClass.start.toDate(), schoolClass.end.toDate(), getWeekdayByNumber(teachingHour.weekday));

            weeklyDates.all().forEach(date => {
                events.push({
                    start: this.createEventDate(date, lesson.lessonHour.start),
                    end: this.createEventDate(date, lesson.lessonHour.end),
                    title: 'A draggable and resizable event',
                    color: (schoolClass.id === 2) ? colors.yellow : colors.blue,
                    meta: lesson
                });
            });
        });
        return events;
    }

    private createRecursWeeklyRule(startDate: Date, endDate: Date, weekDay: RRule.Weekday): RRule {
        return new RRule({
            dtstart: startOfWeek(startDate),
            until: endOfWeek(endDate),
            freq: RRule.WEEKLY,
            byweekday: [weekDay]
        });
    }

    private createEventDate(date: Date, timeString: string): Date {
        const eventDate = new Date(date);
        eventDate.setHours(DateFormatter.createHoursFromTimeString(timeString));
        eventDate.setMinutes(DateFormatter.createMinutesFromTimeString(timeString));
        return eventDate;
    }
}
