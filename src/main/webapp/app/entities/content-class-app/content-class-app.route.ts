import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContentClassAppComponent } from './content-class-app.component';
import { ContentClassAppDetailComponent } from './content-class-app-detail.component';
import { ContentClassAppPopupComponent } from './content-class-app-dialog.component';
import { ContentClassAppDeletePopupComponent } from './content-class-app-delete-dialog.component';

export const contentRoute: Routes = [
    {
        path: 'content-class-app',
        component: ContentClassAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'content-class-app/:id',
        component: ContentClassAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contentPopupRoute: Routes = [
    {
        path: 'content-class-app-new',
        component: ContentClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.content.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'content-class-app/:id/edit',
        component: ContentClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.content.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'content-class-app/:id/delete',
        component: ContentClassAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.content.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
