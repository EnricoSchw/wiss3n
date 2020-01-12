import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isNavbarCalendarCollapsed = true;

  constructor(private accountService: AccountService
  ) {
  }

  ngOnInit() {
    // this.user$ = this.userService.getCurrentUser().pipe(
    //     defaultIfEmpty({  firstName: 'unknown', lastName: 'unknown'} as User)
    // );
  }

  isUser(): boolean {
    return this.accountService.hasAnyAuthority(['ROLE_USER']) &&
      !this.accountService.hasAnyAuthority(['ROLE_ADMIN']);

  }


  public toggle(e) {

    e.target.toggleClass('toggled');
    e.target.slideToggle(320);
  }

  openCalendar() {
    this.isNavbarCalendarCollapsed = (!this.isNavbarCalendarCollapsed);
  }
}
