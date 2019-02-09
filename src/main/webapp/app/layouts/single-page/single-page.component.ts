import { Component, OnInit } from '@angular/core';
import { LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

declare const $: any;


@Component({
    selector: 'jhi-single-page',
    templateUrl: './single-page.component.html',
    styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {

    modalRef: NgbModalRef;

    constructor(private loginModalService: LoginModalService) {
    }

    collapseNavbar() {
        const slide_out_menu = $('#slide_out_menu');
        slide_out_menu.toggleClass('open');
        if (slide_out_menu.hasClass('open')) {
            $('.menu-close').on('click', function (e) {
                e.preventDefault();
                slide_out_menu.removeClass('open');
            });
        }
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    ngOnInit() {
        $(function () {
            'use strict';
            CustomPageJS();
            CustomNavigation();
        });

        function CustomNavigation() {

            $(document).ready(function () {
                'use strict';
                const mainNav = $('#main-nav'),
                    slide_out_menu = $('#slide_out_menu'),
                    $window = $(window);

                // // Scroll Events
                // $window.on('scroll', function (e) {
                //
                //     const wScroll = $(this).scrollTop();
                //
                //     // Activate menu
                //     if (wScroll > 20) {
                //         mainNav.addClass('active');
                //         slide_out_menu.addClass('scrolled');
                //     }
                //     else {
                //         mainNav.removeClass('active');
                //         slide_out_menu.removeClass('scrolled');
                //     }
                //     //Scroll Effects
                //
                // });

                // Navigation
                $('#navigation').on('click', function (e) {
                    e.preventDefault();
                    $(this).addClass('open');
                    slide_out_menu.toggleClass('open');

                    if (slide_out_menu.hasClass('open')) {
                        $('.menu-close').on('click', function (e) {
                            e.preventDefault();
                            slide_out_menu.removeClass('open');
                        });
                    }
                });

            //     // Price Table
            //     const individual_price_table = $('#price_tables').find('.individual');
            //     const company_price_table = $('#price_tables').find('.company');
            //
            //     $('.switch-toggles').find('.individual').addClass('active');
            //     $('#price_tables').find('.individual').addClass('active');
            //
            //     $('.switch-toggles').find('.individual').on('click', function () {
            //         $(this).addClass('active');
            //         $(this).closest('.switch-toggles').removeClass('active');
            //         $(this).siblings().removeClass('active');
            //         individual_price_table.addClass('active');
            //         company_price_table.removeClass('active');
            //     });
            //
            //     $('.switch-toggles').find('.company').on('click', function () {
            //         $(this).addClass('active');
            //         $(this).closest('.switch-toggles').addClass('active');
            //         $(this).siblings().removeClass('active');
            //         company_price_table.addClass('active');
            //         individual_price_table.removeClass('active');
            //     });
            //
            //     // Menu For Xs Mobile Screens
            //     if ($(window).height() < 450) {
            //         slide_out_menu.addClass('xs-screen');
            //     }
            //
            //     $(window).on('resize', function () {
            //         if ($(window).height() < 450) {
            //             slide_out_menu.addClass('xs-screen');
            //         } else {
            //             slide_out_menu.removeClass('xs-screen');
            //         }
            //     });
            //
            //
            //     // SmoothScroll
            //
            //     $('#main-nav li a, a.scrool').on('click', function (e) {
            //
            //         const full_url = this.href;
            //         const parts = full_url.split('#');
            //         const trgt = parts[1];
            //         const target_offset = $('#' + trgt).offset();
            //         const target_top = target_offset.top;
            //
            //         $('html,body').animate({scrollTop: target_top - 76}, 1000);
            //         return false;
            //
            //     });
            //
            //     // Popup-Gallery
            //
            //     $('#main-nav .nav-active li a').on('click', function () {
            //         $(this).parent().addClass('active').siblings().removeClass('active');
            //
            //     });
            });

        }

        function CustomPageJS() {
            $('.boxs-close').on('click', function () {
                const element = $(this);
                const cards = element.parents('.card');
                cards.addClass('closed').fadeOut();
            });

            // Theme Light and Dark  ============
            $('.theme-light-dark .t-light').on('click', function () {
                $('body').removeClass('menu_dark');
            });

            $('.theme-light-dark .t-dark').on('click', function () {
                $('body').addClass('menu_dark');
            });

            $('.menu-sm').on('click', function () {
                $('body').toggleClass('menu_sm');
            });
            // Chat widget js ====
            $(document).ready(function () {
                $('.btn_overlay').on('click', function () {
                    $('.overlay_menu').fadeToggle(200);
                    $(this).toggleClass('btn-open').toggleClass('btn-close');
                });
            });
            $('.overlay_menu').on('click', function () {
                $('.overlay_menu').fadeToggle(200);
                $('.overlay_menu button.btn').toggleClass('btn-open').toggleClass('btn-close');
            });
            // =========
            $('.form-control').on('focus', function () {
                $(this).parent('.input-group').addClass('input-group-focus');
            }).on('blur', function () {
                $(this).parent('.input-group').removeClass('input-group-focus');
            });
        }
    }

}
