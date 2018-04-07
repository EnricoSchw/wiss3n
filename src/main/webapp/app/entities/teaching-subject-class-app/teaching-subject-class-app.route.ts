import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TeachingSubjectClassAppComponent } from './teaching-subject-class-app.component';
import { TeachingSubjectClassAppDetailComponent } from './teaching-subject-class-app-detail.component';
import { TeachingSubjectClassAppPopupComponent } from './teaching-subject-class-app-dialog.component';
import { TeachingSubjectClassAppDeletePopupComponent } from './teaching-subject-class-app-delete-dialog.component';

@Injectable()
export class TeachingSubjectClassAppResolvePagingParams implements Resolve<any> {

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

export const teachingSubjectRoute: Routes = [
    {
        path: 'teaching-subject-class-app',
        component: TeachingSubjectClassAppComponent,
        resolve: {
            'pagingParams': TeachingSubjectClassAppResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'teaching-subject-class-app/:id',
        component: TeachingSubjectClassAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teachingSubjectPopupRoute: Routes = [
    {
        path: 'teaching-subject-class-app-new',
        component: TeachingSubjectClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teaching-subject-class-app/:id/edit',
        component: TeachingSubjectClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teaching-subject-class-app/:id/delete',
        component: TeachingSubjectClassAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
