import { Component, Input, OnInit } from '@angular/core';
import { DayViewEvent } from 'calendar-utils';

@Component({
    selector: 'jhi-subject-hour-view',
    templateUrl: './subject-hour-view.component.html',
    styleUrls: ['./subject-hour-view.component.scss']
})
export class SubjectHourViewComponent implements OnInit {

    @Input() dayEvent: DayViewEvent;

    constructor() {
    }

    ngOnInit() {

    }

}
