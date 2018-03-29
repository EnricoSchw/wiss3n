import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TagClassAppComponent } from './tag-class-app.component';
import { TagClassAppDetailComponent } from './tag-class-app-detail.component';
import { TagClassAppPopupComponent } from './tag-class-app-dialog.component';
import { TagClassAppDeletePopupComponent } from './tag-class-app-delete-dialog.component';

export const tagRoute: Routes = [
    {
        path: 'tag-class-app',
        component: TagClassAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tag-class-app/:id',
        component: TagClassAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tagPopupRoute: Routes = [
    {
        path: 'tag-class-app-new',
        component: TagClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tag-class-app/:id/edit',
        component: TagClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tag-class-app/:id/delete',
        component: TagClassAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
