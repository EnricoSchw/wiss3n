import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './reducers';
import { APP_ENVIRONMENT } from '../app.constants';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreCalendarLessonDataService } from 'app/store/calendar-lesson-data/store-calendar-lesson-data.service';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { StoreUserService } from 'app/store/user/store-user.service';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        APP_ENVIRONMENT !== 'production' ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects]),
    ],
    providers: [
        StoreCalendarLessonDataService,
        StoreTeachingSubjectService,
        StoreSchoolClassService,
        StoreUserService
    ],
    declarations: []
})
export class Wiss3NStoreModule {
}
