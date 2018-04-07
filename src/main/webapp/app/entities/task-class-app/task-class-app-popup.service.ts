import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TaskClassApp } from './task-class-app.model';
import { TaskClassAppService } from './task-class-app.service';

@Injectable()
export class TaskClassAppPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private taskService: TaskClassAppService

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
                this.taskService.find(id)
                    .subscribe((taskResponse: HttpResponse<TaskClassApp>) => {
                        const task: TaskClassApp = taskResponse.body;
                        if (task.start) {
                            task.start = {
                                year: task.start.getFullYear(),
                                month: task.start.getMonth() + 1,
                                day: task.start.getDate()
                            };
                        }
                        if (task.end) {
                            task.end = {
                                year: task.end.getFullYear(),
                                month: task.end.getMonth() + 1,
                                day: task.end.getDate()
                            };
                        }
                        this.ngbModalRef = this.taskModalRef(component, task);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.taskModalRef(component, new TaskClassApp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    taskModalRef(component: Component, task: TaskClassApp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.task = task;
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
