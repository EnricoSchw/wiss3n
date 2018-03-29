import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-info',
    templateUrl: './info.component.html',
    styleUrls: ['../home.scss', './info.component.scss']

})
export class InfoComponent implements OnInit {

    ngOnInit(): void {
        // $(() => {
        //     $('a[href*=#]').on('click', (e) => {
        //         e.preventDefault();
        //         $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
        //     });
        // });
    }
}
