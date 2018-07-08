import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Content } from 'app/shared/model/content.model';
import { ContentService } from './content.service';
import { ContentComponent } from './content.component';
import { ContentDetailComponent } from './content-detail.component';
import { ContentUpdateComponent } from './content-update.component';
import { ContentDeletePopupComponent } from './content-delete-dialog.component';
import { IContent } from 'app/shared/model/content.model';

@Injectable({ providedIn: 'root' })
export class ContentResolve implements Resolve<IContent> {
    constructor(private service: ContentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((content: HttpResponse<Content>) => content.body);
        }
        return Observable.of(new Content());
    }
}

export const contentRoute: Routes = [
    {
        path: 'content',
        component: ContentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'wiss3NApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'content/:id/view',
        component: ContentDetailComponent,
        resolve: {
            content: ContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'content/new',
        component: ContentUpdateComponent,
        resolve: {
            content: ContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'content/:id/edit',
        component: ContentUpdateComponent,
        resolve: {
            content: ContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contentPopupRoute: Routes = [
    {
        path: 'content/:id/delete',
        component: ContentDeletePopupComponent,
        resolve: {
            content: ContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wiss3NApp.content.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
