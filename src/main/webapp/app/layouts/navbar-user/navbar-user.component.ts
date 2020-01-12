import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { VERSION } from 'app/app.constants';
import { ProfileService } from '../profiles/profile.service';
import { LoginService } from 'app/core/login/login.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';

declare const $: any;

@Component({
    selector: 'jhi-navbar-user',
    templateUrl: './navbar-user.component.html'
})
export class NavbarUserComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    isSideMenuOpen = false;

    constructor(
        private loginService: LoginService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {

        $('.menu-sm').on('click', function() {
            $('body').toggleClass('menu_sm');
        });


        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

    }

    openSideMenu() {
        this.isSideMenuOpen = true;
    }

    closeSideMenu() {
        this.isSideMenuOpen = false;
    }



    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    toggleSidebar() {
        $('body').toggleClass('menu_sm');
    }

    toggleSMSidebar() {
        $('body').toggleClass('overlay-open');
        $('body').removeClass('menu_sm');
    }
    getImageUrl() {
        return this.accountService.getImageUrl();
    }
}
