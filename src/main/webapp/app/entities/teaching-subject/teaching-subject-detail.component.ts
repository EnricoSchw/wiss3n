import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';

@Component({
    selector: 'jhi-teaching-subject-detail',
    templateUrl: './teaching-subject-detail.component.html'
})
export class TeachingSubjectDetailComponent implements OnInit {
    teachingSubject: ITeachingSubject;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teachingSubject }) => {
            this.teachingSubject = teachingSubject;
        });
    }

    previousState() {
        window.history.back();
    }
}
