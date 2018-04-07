import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TeachingSubjectClassApp } from './teaching-subject-class-app.model';
import { TeachingSubjectClassAppService } from './teaching-subject-class-app.service';

@Injectable()
export class TeachingSubjectClassAppPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private teachingSubjectService: TeachingSubjectClassAppService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.teachingSubjectService.find(id)
                    .subscribe((teachingSubjectResponse: HttpResponse<TeachingSubjectClassApp>) => {
                        const teachingSubject: TeachingSubjectClassApp = teachingSubjectResponse.body;
                        if (teachingSubject.year) {
                            teachingSubject.year = {
                                year: teachingSubject.year.getFullYear(),
                                month: teachingSubject.year.getMonth() + 1,
                                day: teachingSubject.year.getDate()
                            };
                        }
                        this.ngbModalRef = this.teachingSubjectModalRef(component, teachingSubject);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.teachingSubjectModalRef(component, new TeachingSubjectClassApp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    teachingSubjectModalRef(component: Component, teachingSubject: TeachingSubjectClassApp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.teachingSubject = teachingSubject;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
