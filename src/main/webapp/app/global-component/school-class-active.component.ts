import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { Subscription } from 'rxjs/Subscription';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';

@Component({
    selector: 'jhi-school-class-active',
    templateUrl: './school-class-active.component.html',
    styleUrls: ['./school-class-active.component.scss']
})
export class SchoolClassActiveComponent implements OnInit, OnDestroy {

    schoolClasses$: Observable<ISchoolClass[]>;

    activeClassId: number;
    private subActiveId: Subscription;

    constructor(private schoolClassService: StoreSchoolClassService) {

    }

    ngOnInit() {
        this.subActiveId = this.schoolClassService.getActiveSchoolClass().map(s => s.id).subscribe(id => {
            this.activeClassId = id;
        });

        this.schoolClasses$ = this.schoolClassService.getAll();
    }

    setSchoolClassActive(id: number) {
        this.activeClassId = id;
        this.schoolClassService.activateBySchoolClassId(id);
    }

    ngOnDestroy() {
        this.subActiveId.unsubscribe();
    }

}
