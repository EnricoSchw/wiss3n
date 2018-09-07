import { Component, OnInit } from '@angular/core';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { Observable } from 'rxjs/Observable';
import { ITeachingSubject, TeachingSubject } from 'app/shared/model/teaching-subject.model';
import { Dictionary } from '@ngrx/entity';

@Component({
    selector: 'jhi-select-teaching-subject',
    templateUrl: './select-teaching-subject.component.html',
    styleUrls: ['./select-teaching-subject.component.scss']
})
export class SelectTeachingSubjectComponent implements OnInit {

    teachingSubjects$: Observable<ITeachingSubject[]> = Observable.of([]);

    currentTeachingSubject = <ITeachingSubject>{id: -1};

    constructor(private store: StoreTeachingSubjectService) {
    }

    ngOnInit() {
        this.teachingSubjects$ = this.store.getAll();
    }

}
