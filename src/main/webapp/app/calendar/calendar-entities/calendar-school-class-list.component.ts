import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ISchoolClass } from 'app/shared/model/school-class.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';

@Component({
    selector: 'jhi-calendar-school-class-list',
    templateUrl: './calendar-school-class-list.component.html',
    styleUrls: ['./../calendar-board/calendar-board.scss']
})
export class CalendarSchoolClassListComponent implements OnInit, OnDestroy {
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

    @Output() changeActiveSchoolClass = new EventEmitter<ISchoolClass>();

    constructor(
        private schoolClassService: SchoolClassService,
        private storeService: CalendarSubjectEventStoreService,
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
                .subscribe(
                    (res: HttpResponse<ISchoolClass[]>) => {
                        this.schoolClasses = res.body;
                        console.log('##################################', 'emit');
                        this.storeService.loadAll(this.schoolClasses);

                    },(res: HttpErrorResponse) => this.onError(res.message)

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

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
