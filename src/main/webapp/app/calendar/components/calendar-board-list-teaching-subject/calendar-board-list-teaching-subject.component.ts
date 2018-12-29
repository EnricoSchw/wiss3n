import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeachingSubjectService } from 'app/entities/teaching-subject/teaching-subject.service';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { JhiAlertService } from 'ng-jhipster';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';

@Component({
    selector: 'jhi-calendar-board-list-teaching-subject',
    templateUrl: './calendar-board-list-teaching-subject.component.html',
    styleUrls: ['./../../scss/calendar-board.scss']
})
export class CalendarBoardListTeachingSubjectComponent implements OnInit {
    teachingSubjects$: Observable<ITeachingSubject[]> =  Observable.of([]);

    constructor(private storeService: StoreSchoolClassService,
                private teachingSubjectService: TeachingSubjectService,
                private jhiAlertService: JhiAlertService) {
    }

    ngOnInit() {
        this.teachingSubjects$ = this.storeService
            .getActiveSchoolClassId()
            .filter(id => id !== null)
            .flatMap(id => this.teachingSubjectService.findBySchoolClassId(id))
            .map(response => response.body)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        this.jhiAlertService.error('Something bad happened; please try again later.', null, null);
        return throwError(
            'Something bad happened; please try again later.');
    }

}
