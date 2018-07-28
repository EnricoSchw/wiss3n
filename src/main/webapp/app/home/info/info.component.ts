import { Component, OnInit } from '@angular/core';
import { LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-info',
    templateUrl: './info.component.html',
    styleUrls: ['../home.scss', './info.component.scss']

})
export class InfoComponent implements OnInit {

    modalRef: NgbModalRef;

    constructor(
        private loginModalService: LoginModalService,
        private router: Router
    ) {}

    ngOnInit(): void {
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
