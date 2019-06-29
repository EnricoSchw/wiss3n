import { Component } from '@angular/core';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'jhi-calendar-board',
    templateUrl: './calendar-board.component.html',
    styleUrls: ['./calendar-board.component.scss', './../../scss/calendar-board.scss']
})
export class CalendarBoardComponent {

    isClassMenuOpen=false;

    activeSchoolClassName$: Observable<String>;

    constructor(private schoolClassService: StoreSchoolClassService) {
        this.activeSchoolClassName$ = schoolClassService
            .getActiveSchoolClass()
            .map(s => {
                return s === null ? "Lege eine Klasse an!": s.name;
            });
    }

    toggleClassMenu():void {
        this.isClassMenuOpen = !this.isClassMenuOpen;
    }
}
