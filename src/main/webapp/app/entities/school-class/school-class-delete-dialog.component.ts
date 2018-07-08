import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISchoolClass } from 'app/shared/model/school-class.model';
import { SchoolClassService } from './school-class.service';

@Component({
    selector: 'jhi-school-class-delete-dialog',
    templateUrl: './school-class-delete-dialog.component.html'
})
export class SchoolClassDeleteDialogComponent {
    schoolClass: ISchoolClass;

    constructor(
        private schoolClassService: SchoolClassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.schoolClassService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'schoolClassListModification',
                content: 'Deleted an schoolClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-school-class-delete-popup',
    template: ''
})
export class SchoolClassDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schoolClass }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SchoolClassDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.schoolClass = schoolClass;
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
