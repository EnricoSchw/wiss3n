import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { TeachingSubject } from 'app/shared/model/teaching-subject.model';
import { TeachingSubjectService } from './teaching-subject.service';
import { TeachingSubjectComponent } from './teaching-subject.component';
import { TeachingSubjectDetailComponent } from './teaching-subject-detail.component';
import { TeachingSubjectUpdateComponent } from './teaching-subject-update.component';
import { TeachingSubjectDeletePopupComponent } from './teaching-subject-delete-dialog.component';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';

@Injectable({ providedIn: 'root' })
export class TeachingSubjectResolve implements Resolve<ITeachingSubject> {
    constructor(private service: TeachingSubjectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((teachingSubject: HttpResponse<TeachingSubject>) => teachingSubject.body);
        }
        return Observable.of(new TeachingSubject());
    }
}

export const teachingSubjectRoute: Routes = [
    {
        path: 'teaching-subject',
        component: TeachingSubjectComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'wiss3NApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teaching-subject/:id/view',
        component: TeachingSubjectDetailComponent,
        resolve: {
            teachingSubject: TeachingSubjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teaching-subject/new',
        component: TeachingSubjectUpdateComponent,
        resolve: {
            teachingSubject: TeachingSubjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teaching-subject/:id/edit',
        component: TeachingSubjectUpdateComponent,
        resolve: {
            teachingSubject: TeachingSubjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teachingSubjectPopupRoute: Routes = [
    {
        path: 'teaching-subject/:id/delete',
        component: TeachingSubjectDeletePopupComponent,
        resolve: {
            teachingSubject: TeachingSubjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
