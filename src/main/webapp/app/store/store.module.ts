import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './reducers';
import { APP_ENVIRONMENT } from '../app.constants';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { CalendarSubjectEventEntityService } from 'app/store/calendar-subject-event/calendar-subject-event-entity.service';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        APP_ENVIRONMENT !== 'production' ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects]),
    ],
    providers: [
        CalendarSubjectEventEntityService,
        CalendarSubjectEventStoreService,
        StoreTeachingSubjectService
    ],
    declarations: []
})
export class Wiss3NStoreModule {
}
