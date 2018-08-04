import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { APP_ENVIRONMENT } from '../../app.constants';
import * as fromCalendarSubjectEvent from '../calendar-subject-event/calendar-subject-event.reducer';

export interface State {
  calendarSubjectEvent: fromCalendarSubjectEvent.State;
}

export const reducers: ActionReducerMap<State> = {
  calendarSubjectEvent: fromCalendarSubjectEvent.reducer,
};

export const metaReducers: MetaReducer<State>[] = APP_ENVIRONMENT !== 'production'  ? [] : [];
