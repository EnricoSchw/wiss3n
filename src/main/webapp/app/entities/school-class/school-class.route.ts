import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { SchoolClass } from 'app/shared/model/school-class.model';
import { SchoolClassService } from './school-class.service';
import { SchoolClassComponent } from './school-class.component';
import { SchoolClassDetailComponent } from './school-class-detail.component';
import { SchoolClassUpdateComponent } from './school-class-update.component';
import { SchoolClassDeletePopupComponent } from './school-class-delete-dialog.component';
import { ISchoolClass } from 'app/shared/model/school-class.model';

@Injectable({ providedIn: 'root' })
export class SchoolClassResolve implements Resolve<ISchoolClass> {
    constructor(private service: SchoolClassService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((schoolClass: HttpResponse<SchoolClass>) => schoolClass.body);
        }
        return Observable.of(new SchoolClass());
    }
}

export const schoolClassRoute: Routes = [
    {
        path: 'school-class',
        component: SchoolClassComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'wiss3NApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'school-class/:id/view',
        component: SchoolClassDetailComponent,
        resolve: {
            schoolClass: SchoolClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'school-class/new',
        component: SchoolClassUpdateComponent,
        resolve: {
            schoolClass: SchoolClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'school-class/:id/edit',
        component: SchoolClassUpdateComponent,
        resolve: {
            schoolClass: SchoolClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolClassPopupRoute: Routes = [
    {
        path: 'school-class/:id/delete',
        component: SchoolClassDeletePopupComponent,
        resolve: {
            schoolClass: SchoolClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.schoolClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
