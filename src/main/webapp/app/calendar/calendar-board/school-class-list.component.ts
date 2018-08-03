import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ISchoolClass } from 'app/shared/model/school-class.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';

@Component({
    selector: 'jhi-school-class-list',
    templateUrl: './school-class-list.component.html',
    styleUrls: ['./calendar-board.scss']
})
export class SchoolClassListComponent implements OnInit, OnDestroy {
    currentAccount: any;
    schoolClasses: ISchoolClass[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 0;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private schoolClassService: SchoolClassService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        // this.routeData = this.activatedRoute.data.subscribe(data => {
        //     this.page = 1;
        //     this.previousPage = data.pagingParams.page;
        //     this.reverse = data.pagingParams.ascending;
        //     this.predicate = data.pagingParams.predicate;
        // });
        // this.currentSearch =
        //     this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
        //         ? this.activatedRoute.snapshot.params['search']
        //         : '';
    }

    loadAll() {
            this.schoolClassService
                .searchActive({
                    page: 0,
                    size: this.itemsPerPage
                    //sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<ISchoolClass[]>) => this.schoolClasses = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );

        this.schoolClassService
            .searchForTeachingHours(7   , {
                page: 0,
                size: this.itemsPerPage
                //sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ISchoolClass[]>) => {
                    console.log(res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
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
