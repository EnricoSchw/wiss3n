import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { VERSION } from 'app/app.constants';
import { ProfileService } from '../profiles/profile.service';
import { LoginService } from 'app/core/login/login.service';
import { LoginModalService } from 'app/core/login/login-modal.service';

declare const $: any;

@Component({
  selector: 'jhi-navbar-info',
  templateUrl: './navbar-info.component.html'
})
export class NavbarInfoComponent implements OnInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  isSideMenuOpen = false;

  constructor(
    private loginService: LoginService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    $('.menu-sm').on('click', function () {
      $('body').toggleClass('menu_sm');
    });

    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

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


  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }


}
