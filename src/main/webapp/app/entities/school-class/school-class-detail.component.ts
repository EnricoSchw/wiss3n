import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchoolClass } from 'app/shared/model/school-class.model';

@Component({
    selector: 'jhi-school-class-detail',
    templateUrl: './school-class-detail.component.html'
})
export class SchoolClassDetailComponent implements OnInit {
    schoolClass: ISchoolClass;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schoolClass }) => {
            this.schoolClass = schoolClass;
        });
    }

    previousState() {
        window.history.back();
    }
}
