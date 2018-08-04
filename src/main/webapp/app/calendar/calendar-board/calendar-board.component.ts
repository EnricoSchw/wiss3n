import { Component } from '@angular/core';
import { ISchoolClass } from 'app/shared/model/school-class.model';

@Component({
    selector: 'jhi-calendar-board',
    templateUrl: './calendar-board.component.html',
    styleUrls: ['./calendar-board.component.scss', '/calendar-board.scss']
})
export class CalendarBoardComponent {

    public activeSchoolClass: ISchoolClass = null;

    setActiveSchoolClass(schoolClass: ISchoolClass) {
        console.log('######################################', schoolClass);
        this.activeSchoolClass = schoolClass;
    }
}
