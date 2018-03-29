import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GradeClassApp } from './grade-class-app.model';
import { GradeClassAppService } from './grade-class-app.service';

@Injectable()
export class GradeClassAppPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private gradeService: GradeClassAppService

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
                this.gradeService.find(id).subscribe((grade) => {
                    if (grade.date) {
                        grade.date = {
                            year: grade.date.getFullYear(),
                            month: grade.date.getMonth() + 1,
                            day: grade.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.gradeModalRef(component, grade);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.gradeModalRef(component, new GradeClassApp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    gradeModalRef(component: Component, grade: GradeClassApp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.grade = grade;
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
