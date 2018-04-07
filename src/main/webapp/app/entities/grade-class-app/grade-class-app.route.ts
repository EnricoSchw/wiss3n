import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GradeClassAppComponent } from './grade-class-app.component';
import { GradeClassAppDetailComponent } from './grade-class-app-detail.component';
import { GradeClassAppPopupComponent } from './grade-class-app-dialog.component';
import { GradeClassAppDeletePopupComponent } from './grade-class-app-delete-dialog.component';

export const gradeRoute: Routes = [
    {
        path: 'grade-class-app',
        component: GradeClassAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.grade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'grade-class-app/:id',
        component: GradeClassAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.grade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gradePopupRoute: Routes = [
    {
        path: 'grade-class-app-new',
        component: GradeClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.grade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grade-class-app/:id/edit',
        component: GradeClassAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.grade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grade-class-app/:id/delete',
        component: GradeClassAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'klassenchatappApp.grade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
