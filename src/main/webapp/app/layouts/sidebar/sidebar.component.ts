    import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Principal, User } from 'app/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { StoreUserService } from 'app/store/user/store-user.service';
import { Observable } from 'rxjs/Observable';
import { defaultIfEmpty } from 'rxjs/operators';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    public isNavbarCalendarCollapsed = true;
    private user$: Observable<User>;

    constructor(
        private userService: StoreUserService,
        private principal: Principal,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.user$ = this.userService.getCurrentUser().pipe(
            defaultIfEmpty({  firstName: 'unknown', lastName: 'unknown'} as User)
        );
        // $(document).ready(function() {
        //     $('.menu-toggle').on('click', function(e) {
        //         const $this = $(this);
        //         const $content = $this.next();
        //
        //         if ($($this.parents('ul')[0]).hasClass('list')) {
        //             const $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');
        //
        //             $.each($('.menu-toggle.toggled').not($not).next(), function(i, val) {
        //                 if ($(val).is(':visible')) {
        //                     $(val).prev().toggleClass('toggled');
        //                     $(val).slideUp();
        //                 }
        //             });
        //         }
        //
        //         $this.toggleClass('toggled');
        //         $content.slideToggle(320);
        //     });
        // });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    public toggle(e) {

        const target = event.target || event.srcElement || event.currentTarget;
        // target.attributes.id;

        // const $this = $(e.target);
        // const $content = $this.next();
        // if ($($this.parents('ul')[0]).hasClass('list')) {
        //     const $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');
        //
        //     $.each($('.menu-toggle.toggled').not($not).next(), function(i, val) {
        //         if ($(val).is(':visible')) {
        //             $(val).prev().toggleClass('toggled');
        //             $(val).slideUp();
        //         }
        //     });
        // }

        e.target.toggleClass('toggled');
        e.target.slideToggle(320);
    }

    openCalendar() {
        this.isNavbarCalendarCollapsed = (!this.isNavbarCalendarCollapsed);
    }
}
