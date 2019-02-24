import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';


declare const $: any;

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;


    isSideMenuOpen = false;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {

        $('.menu-sm').on('click', function() {
            console.log('Hallo');
            $('body').toggleClass('menu_sm');
        });


        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        if (!this.isAuthenticated()) {
            $(window).scroll(() => {
                // 100 = The point you would like to fade the nav in.
                if ($(window).scrollTop() > 100) {
                    $('.navbar').addClass('navbar-shown');
                    // navbar-dark navbar-expand-md bg-primary navbar-transparent
                } else {
                    $('.navbar').removeClass('navbar-shown');
                }
            });
        }
    }

    openSideMenu() {
        this.isSideMenuOpen = true;
    }

    closeSideMenu() {
        this.isSideMenuOpen = false;
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
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

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
