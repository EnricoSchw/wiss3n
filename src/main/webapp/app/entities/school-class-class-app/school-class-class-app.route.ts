import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SchoolClassClassAppComponent } from './school-class-class-app.component';
import { SchoolClassClassAppDetailComponent } from './school-class-class-app-detail.component';
import { SchoolClassClassAppPopupComponent } from './school-class-class-app-dialog.component';
import { SchoolClassClassAppDeletePopupComponent } from './school-class-class-app-delete-dialog.component';

@Injectable()
export class SchoolClassClassAppResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const schoolClassRoute: Routes = [
    {
        path: 'school-class-class-app',
        component: SchoolClassClassAppComponent,
        resolve: {
            'pagingParams': SchoolClassClassAppResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school-class-class-app/:id',
        component: SchoolClassClassAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolClassPopupRoute: Routes = [
    {
        path: 'school-class-class-app-new',
        component: SchoolClassClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-class-class-app/:id/edit',
        component: SchoolClassClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-class-class-app/:id/delete',
        component: SchoolClassClassAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
