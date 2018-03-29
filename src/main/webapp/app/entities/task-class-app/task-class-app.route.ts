import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TaskClassAppComponent } from './task-class-app.component';
import { TaskClassAppDetailComponent } from './task-class-app-detail.component';
import { TaskClassAppPopupComponent } from './task-class-app-dialog.component';
import { TaskClassAppDeletePopupComponent } from './task-class-app-delete-dialog.component';

export const taskRoute: Routes = [
    {
        path: 'task-class-app',
        component: TaskClassAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'task-class-app/:id',
        component: TaskClassAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskPopupRoute: Routes = [
    {
        path: 'task-class-app-new',
        component: TaskClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-class-app/:id/edit',
        component: TaskClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-class-app/:id/delete',
        component: TaskClassAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
