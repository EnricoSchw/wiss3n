import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { CalendarLessonDataService } from 'app/entities/calendar-lesson-data/calendar-lesson-data.service';

@Component({
    selector: 'jhi-calendar-board-list-school-class',
    templateUrl: './calendar-board-list-school-class.component.html',
    styleUrls: ['./../../scss/calendar-board.scss']
})
export class CalendarBoardListSchoolClassComponent implements OnInit, OnDestroy {
    currentAccount: any;
    schoolClasses: ISchoolClass[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 0;
    predicate: any;
    reverse: any;

    activeClassId: number;

    constructor(
        private schoolClassService: SchoolClassService,
        private calendarLessonDataService: CalendarLessonDataService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
        this.schoolClassService
            .searchActive({
                page: 0,
                size: this.itemsPerPage
            })
            .filter((res: HttpResponse<ISchoolClass[]>) => res.body.length > 0)
            .subscribe(
                (res: HttpResponse<ISchoolClass[]>) => {
                    this.schoolClasses = res.body;
                    this.calendarLessonDataService.loadAll(this.schoolClasses);
                    this.setSchoolClassActive(this.schoolClasses[0].id);
                }, (res: HttpErrorResponse) => this.onError(res.message)
            );
        return;
    }

    loadPage(page: number) {
        this.loadAll();
    }

    transition() {
        this.router.navigate(['/school-class'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSchoolClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISchoolClass) {
        return item.id;
    }

    registerChangeInSchoolClasses() {
        this.eventSubscriber = this.eventManager.subscribe('schoolClassListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    setSchoolClassActive(id: number) {
        this.activeClassId = id;
        this.calendarLessonDataService.activateBySchoolClassId(id);
    }
}
