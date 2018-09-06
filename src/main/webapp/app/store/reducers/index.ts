import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer, StoreModule
} from '@ngrx/store';
import { APP_ENVIRONMENT } from '../../app.constants';
import * as fromCalendarSubjectEvent from '../calendar-subject-event/calendar-subject-event.reducer';
import * as fromStoreTeachingSubject from 'app/store/teaching-subject/store-teaching-subject.reducer';

export interface State {
    calendarSubjectEvent: fromCalendarSubjectEvent.State;
    storeTeachingSubject: fromStoreTeachingSubject.State
}

export const reducers: ActionReducerMap<State> = {
    calendarSubjectEvent: fromCalendarSubjectEvent.reducer,
    storeTeachingSubject: fromStoreTeachingSubject.reducer
};

export const metaReducers: MetaReducer<State>[] = APP_ENVIRONMENT !== 'production' ? [] : [];
