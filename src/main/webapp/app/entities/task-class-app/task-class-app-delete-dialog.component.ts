import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TaskClassApp } from './task-class-app.model';
import { TaskClassAppPopupService } from './task-class-app-popup.service';
import { TaskClassAppService } from './task-class-app.service';

@Component({
    selector: 'jhi-task-class-app-delete-dialog',
    templateUrl: './task-class-app-delete-dialog.component.html'
})
export class TaskClassAppDeleteDialogComponent {

    task: TaskClassApp;

    constructor(
        private taskService: TaskClassAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taskService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'taskListModification',
                content: 'Deleted an task'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-task-class-app-delete-popup',
    template: ''
})
export class TaskClassAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.taskPopupService
                .open(TaskClassAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
