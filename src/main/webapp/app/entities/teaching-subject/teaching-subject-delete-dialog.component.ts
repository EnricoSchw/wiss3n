import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { TeachingSubjectService } from './teaching-subject.service';

@Component({
    selector: 'jhi-teaching-subject-delete-dialog',
    templateUrl: './teaching-subject-delete-dialog.component.html'
})
export class TeachingSubjectDeleteDialogComponent {
    teachingSubject: ITeachingSubject;

    constructor(
        private teachingSubjectService: TeachingSubjectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teachingSubjectService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'teachingSubjectListModification',
                content: 'Deleted an teachingSubject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teaching-subject-delete-popup',
    template: ''
})
export class TeachingSubjectDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teachingSubject }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TeachingSubjectDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.teachingSubject = teachingSubject;
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
