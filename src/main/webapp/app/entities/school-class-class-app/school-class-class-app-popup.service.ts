import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SchoolClassClassApp } from './school-class-class-app.model';
import { SchoolClassClassAppService } from './school-class-class-app.service';

@Injectable()
export class SchoolClassClassAppPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private schoolClassService: SchoolClassClassAppService

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
                this.schoolClassService.find(id)
                    .subscribe((schoolClassResponse: HttpResponse<SchoolClassClassApp>) => {
                        const schoolClass: SchoolClassClassApp = schoolClassResponse.body;
                        if (schoolClass.date) {
                            schoolClass.date = {
                                year: schoolClass.date.getFullYear(),
                                month: schoolClass.date.getMonth() + 1,
                                day: schoolClass.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.schoolClassModalRef(component, schoolClass);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.schoolClassModalRef(component, new SchoolClassClassApp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    schoolClassModalRef(component: Component, schoolClass: SchoolClassClassApp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.schoolClass = schoolClass;
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
