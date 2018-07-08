import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeachingHour } from 'app/shared/model/teaching-hour.model';

@Component({
    selector: 'jhi-teaching-hour-detail',
    templateUrl: './teaching-hour-detail.component.html'
})
export class TeachingHourDetailComponent implements OnInit {
    teachingHour: ITeachingHour;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teachingHour }) => {
            this.teachingHour = teachingHour;
        });
    }

    previousState() {
        window.history.back();
    }
}
