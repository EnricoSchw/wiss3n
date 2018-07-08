import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import { TeachingHourService } from './teaching-hour.service';

@Component({
    selector: 'jhi-teaching-hour-delete-dialog',
    templateUrl: './teaching-hour-delete-dialog.component.html'
})
export class TeachingHourDeleteDialogComponent {
    teachingHour: ITeachingHour;

    constructor(
        private teachingHourService: TeachingHourService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teachingHourService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'teachingHourListModification',
                content: 'Deleted an teachingHour'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teaching-hour-delete-popup',
    template: ''
})
export class TeachingHourDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teachingHour }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TeachingHourDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.teachingHour = teachingHour;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
