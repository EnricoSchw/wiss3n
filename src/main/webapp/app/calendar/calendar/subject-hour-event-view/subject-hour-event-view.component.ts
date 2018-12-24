import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Task, TaskType } from 'app/shared/model/task.model';

@Component({
    selector: 'jhi-subject-hour-event-view',
    templateUrl: './subject-hour-event-view.component.html',
    styleUrls: ['./subject-hour-event-view.component.scss', '../subject-hour.scss']
})
export class SubjectHourEventViewComponent implements OnInit {

    @Input() event: CalendarEvent<any>;

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Convert Task Type to string
     * @param {TaskType} type
     * @returns {string}
     */
    public convertTypeToString(type: TaskType): string {
        return Task.convertTypeToString(type);
    }
}
