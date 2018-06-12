import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-calendar-board',
    templateUrl: './calendar-board.component.html',
    styleUrls: ['./calendar-board.component.scss']
})
export class CalendarBoardComponent implements OnInit {

    constructor(private router: Router,) {
    }

    ngOnInit() {
    }

}
