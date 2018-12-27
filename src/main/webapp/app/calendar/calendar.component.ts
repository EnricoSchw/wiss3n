import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, ViewPeriod } from 'calendar-utils';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import { RRule } from 'rrule';
import { CalendarDateFormatter, CalendarEventAction } from 'angular-calendar';
import { Task, TaskType } from 'app/shared/model/task.model';

import { Observable } from 'rxjs/Observable';
import { CalendarLesson } from 'app/shared/model/calendar-lesson-data.model';
import { CalendarService } from 'app/calendar/providers/calendar.service';
import { CustomDateFormatter } from 'app/calendar/util/custom-date-formatter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarMenuComponent } from 'app/calendar/components/calendar-menu/calendar-menu.component';


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


@Component({
    selector: 'jhi-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss', './scss/media-queries.scss'],
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter
        }
    ]
})
export class CalendarComponent implements OnInit, AfterViewInit{

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    @ViewChild('calendarMenu') menu: CalendarMenuComponent;

    modalData: {
        action: string;
        event: CalendarEvent;
    };


    view = 'month';
    viewDate: Date = new Date('2018-07-16');
    // exclude weekends

    monthEvents: CalendarEvent<any>[];
    weekEvents$: Observable<CalendarEvent<CalendarLesson>[]>;

    private activeEvent: CalendarEvent<CalendarLesson>;

    events: CalendarEvent[];



    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];


    constructor(
        private service: CalendarService,
        private modal: NgbModal

    ) {
    }




    public ngAfterViewInit() {
        // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
        // but wait a tick first to avoid one-time devMode
        // unidirectional-data-flow-violation error
        // setTimeout(() => this.view = () => this.timerComponent.seconds, 0);
    }


    public ngOnInit(): void {

        //const events = []; // this.service.loadTasks();
        this.weekEvents$ = this.service
            .loadLessonEvents()
            .map(subjects => {
                this.activeEvent = null;
                return []
                //return this.calendarEventService.createCalendarEvents(subjects, events);
            });

        this.events = [
            {
                start: subDays(startOfDay(new Date()), 1),
                end: addDays(new Date(), 1),
                title: 'A 3 day event',
                color: colors.red,
                actions: this.actions
            },
            {
                start: startOfDay(new Date()),
                title: 'An event with no end date',
                color: colors.yellow,
                actions: this.actions
            },
            {
                start: subDays(endOfMonth(new Date()), 3),
                end: addDays(endOfMonth(new Date()), 3),
                title: 'A long event that spans 2 months',
                color: colors.blue
            },
            {
                start: addHours(startOfDay(new Date()), 2),
                end: new Date(),
                title: 'A draggable and resizable event',
                color: colors.yellow,
                actions: this.actions,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                draggable: true
            }
        ];



        this.monthEvents = this.events;
    }

    public beforeDayViewRender({period}: { period: ViewPeriod }): void {
        // const events: SubjectEvent[] = <SubjectEvent[]> period.events;
        // if (events.length > 0) {
        //     if ((this.activeEvent === null || this.activeEvent === undefined)) {
        //         this.setActiveEvent(events[0]);
        //     }
        //     if (!isSameDay(this.activeEvent.start, this.viewDate)) {
        //         this.setActiveEvent(events[0]);
        //     }
        // }
    }




    /**
     * Convert Task Type to string
     * @param {TaskType} type
     * @returns {string}
     */
    public convertTypeToString(type: TaskType): string {
        return Task.convertTypeToString(type);
    }

    public clickSubjectEventInWeek({event}: { event: CalendarEvent }): void {
        this.setActiveEvent(event);
        this.viewDate = event.start;
        this.view = 'day';
    }

    public clickSubjectEventInDay({event}: { event: CalendarEvent }): void {
        this.setActiveEvent(event);
    }

    private setActiveEvent(event: CalendarEvent) {
        if (this.activeEvent) {
            //this.activeEvent.meta.isActive = false;
        }
        //event.meta.isActive = true;
        this.activeEvent = event;
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

}
