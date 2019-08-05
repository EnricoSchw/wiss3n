import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import {  JhiEventManager } from 'ng-jhipster';
import { Principal } from 'app/core';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { catchError, retry } from 'rxjs/operators';
import { TeachingSubjectService } from 'app/entities/teaching-subject';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';

@Injectable({
    providedIn: 'root'
})
export class SchoolClassInitService {

    constructor(
        private schoolClassService: SchoolClassService,
        private storeSchoolClassService: StoreSchoolClassService,
        private teachingSubjectService: TeachingSubjectService,
        private principal: Principal,
        private eventManager: JhiEventManager
    ) {

    }

    public init() {
        this.readPrincipal();
        this.eventManager.subscribe('authenticationSuccess', () => {
            this.readPrincipal();
        });

        this.storeSchoolClassService
            .getActiveSchoolClassId()
            .filter(id => id !== null)
            .flatMap(id => this.teachingSubjectService.findBySchoolClassId(id))
            .map(response => response.body)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(err => null) // then handle the error
            ).subscribe();
    }

    private readPrincipal(): void {
        this.principal.identity().then(user => {
            if(user !== null) {
                this.loadAll()
            }
        });
    }

    private loadAll() {
        this.schoolClassService
            .searchActive({
                page: 0,
                size: ITEMS_PER_PAGE
            })
            .filter((res: HttpResponse<ISchoolClass[]>) => res.body.length > 0)
            .subscribe(
                (res: HttpResponse<ISchoolClass[]>) => {
                    const schoolClasses = res.body as ISchoolClass[];
                    this.setSchoolClassActive(schoolClasses[0].id);
                }
            );
        this.registerChangeInSchoolClasses();
    }

    private registerChangeInSchoolClasses() {
        this.eventManager.subscribe('schoolClassListModification', () => this.loadAll());
    }

    private setSchoolClassActive(id: number) {
        this.schoolClassService.activateBySchoolClassId(id);
    }

}
