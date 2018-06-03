import { Component, Input, OnInit } from '@angular/core';
import { TaskEventMeta } from '../../models/events';
import { CalendarEvent } from 'calendar-utils';

@Component({
    selector: 'jhi-subject-hour-event-view',
    templateUrl: './subject-hour-event-view.component.html',
    styleUrls: ['./subject-hour-event-view.component.scss']
})
export class SubjectHourEventViewComponent implements OnInit {

    @Input() event: CalendarEvent<TaskEventMeta>;

    constructor() {
    }

    ngOnInit() {
    }

}
