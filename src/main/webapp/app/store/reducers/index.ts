import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer, StoreModule
} from '@ngrx/store';
import { APP_ENVIRONMENT } from '../../app.constants';
import * as fromCalendarLessonData from '../calendar-lesson-data/store-calendar-lesson-data.reducer';
import * as fromStoreTeachingSubject from 'app/store/teaching-subject/store-teaching-subject.reducer';
import * as fromStoreSchoolClass from 'app/store/school-class/store-school-class.reducer';
import * as fromStoreTeachingHour from 'app/store/teaching-hour/store-teaching-hour.reducer';
import * as fromStoreUser from 'app/store/user/user.reducer';

export interface State {
    calendarLessonData: fromCalendarLessonData.State;
    teachingSubject: fromStoreTeachingSubject.State;
    schoolClass: fromStoreSchoolClass.State;
    teachingHour: fromStoreTeachingHour.State;
    user: fromStoreUser.State;
}

export const reducers: ActionReducerMap<State> = {
    calendarLessonData: fromCalendarLessonData.reducer,
    teachingSubject: fromStoreTeachingSubject.reducer,
    schoolClass: fromStoreSchoolClass.reducer,
    teachingHour: fromStoreTeachingHour.reducer,
    user: fromStoreUser.reducer
};

export const metaReducers: MetaReducer<State>[] = APP_ENVIRONMENT !== 'production' ? [] : [];
