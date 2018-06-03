import { Component, Input, OnInit } from '@angular/core';
import { TaskEventMeta } from '../../models/events';
import { CalendarEvent } from 'calendar-utils';
import { TaskType } from '../../../entities/task-class-app';
import { TaskClassApp } from '../../../entities/task-class-app/task-class-app.model';

@Component({
    selector: 'jhi-subject-hour-event-view',
    templateUrl: './subject-hour-event-view.component.html',
    styleUrls: ['./subject-hour-event-view.component.scss', '../subject-hour.scss']
})
export class SubjectHourEventViewComponent implements OnInit {

    @Input() event: CalendarEvent<TaskEventMeta>;

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
        return TaskClassApp.convertTypeToString(type)
    }
}
