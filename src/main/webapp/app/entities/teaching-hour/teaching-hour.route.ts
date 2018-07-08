import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { TeachingHour } from 'app/shared/model/teaching-hour.model';
import { TeachingHourService } from './teaching-hour.service';
import { TeachingHourComponent } from './teaching-hour.component';
import { TeachingHourDetailComponent } from './teaching-hour-detail.component';
import { TeachingHourUpdateComponent } from './teaching-hour-update.component';
import { TeachingHourDeletePopupComponent } from './teaching-hour-delete-dialog.component';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';

@Injectable({ providedIn: 'root' })
export class TeachingHourResolve implements Resolve<ITeachingHour> {
    constructor(private service: TeachingHourService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((teachingHour: HttpResponse<TeachingHour>) => teachingHour.body);
        }
        return Observable.of(new TeachingHour());
    }
}

export const teachingHourRoute: Routes = [
    {
        path: 'teaching-hour',
        component: TeachingHourComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'wiss3NApp.teachingHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teaching-hour/:id/view',
        component: TeachingHourDetailComponent,
        resolve: {
            teachingHour: TeachingHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teaching-hour/new',
        component: TeachingHourUpdateComponent,
        resolve: {
            teachingHour: TeachingHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teaching-hour/:id/edit',
        component: TeachingHourUpdateComponent,
        resolve: {
            teachingHour: TeachingHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teachingHourPopupRoute: Routes = [
    {
        path: 'teaching-hour/:id/delete',
        component: TeachingHourDeletePopupComponent,
        resolve: {
            teachingHour: TeachingHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.teachingHour.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
