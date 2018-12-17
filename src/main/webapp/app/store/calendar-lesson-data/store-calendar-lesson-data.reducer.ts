import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    CalendarLessonDataActions, CalendarLessonDataActionTypes
} from 'app/store/calendar-lesson-data/store-calendar-lesson-data.actions';
import { CalendarLessonData } from 'app/shared/model/calendar-lesson-data.model';


export interface State extends EntityState<CalendarLessonData> {
    // additional entities state properties
    selectedCalendarLessonDataId: number | null;
}

export const adapter: EntityAdapter<CalendarLessonData> = createEntityAdapter<CalendarLessonData>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedCalendarLessonDataId: null
});

export function reducer(
    state = initialState,
    action: CalendarLessonDataActions
): State {
    switch (action.type) {
        case CalendarLessonDataActionTypes.AddCalendarLessonData: {
            return adapter.addOne(action.payload.calendarLessonData, state);
        }

        case CalendarLessonDataActionTypes.UpsertCalendarLessonData: {
            return adapter.upsertOne(action.payload.calendarLessonData, state);
        }

        case CalendarLessonDataActionTypes.AddCalendarLessonDataSet: {
            return adapter.addMany(action.payload.calendarLessonDataSet, state);
        }

        case CalendarLessonDataActionTypes.UpsertCalendarLessonDataSet: {
            return adapter.upsertMany(action.payload.calendarLessonDataSet, state);
        }

        case CalendarLessonDataActionTypes.UpdateCalendarLessonData: {
            return adapter.updateOne(action.payload.calendarLessonData, state);
        }

        case CalendarLessonDataActionTypes.UpdateCalendarLessonDataSet: {
            return adapter.updateMany(action.payload.calendarLessonDataSet, state);
        }

        case CalendarLessonDataActionTypes.DeleteCalendarLessonData: {
            return adapter.removeOne(action.payload.id, state);
        }

        case CalendarLessonDataActionTypes.DeleteCalendarLessonDataSet: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case CalendarLessonDataActionTypes.LoadCalendarLessonDataSet: {
            return adapter.addAll(action.payload.calendarLessonDataSet, { ...state, selectedCalendarLessonDataId: null });
        }

        case CalendarLessonDataActionTypes.ClearCalendarLessonDataSet: {
            return adapter.removeAll({ ...state, selectedCalendarLessonDataId: null });
        }

        case CalendarLessonDataActionTypes.ActivateCalendarLessonData: {
            return { ...state, selectedCalendarLessonDataId: action.payload.id };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedCalendarLessonDataId = (state: State) => state.selectedCalendarLessonDataId;

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();

// Selectors: CalendarLessonData
export const selectCalendarLessonDataState = createFeatureSelector<State>('calendarLessonData');

export const selectCalendarLessonData = createSelector(
    selectCalendarLessonDataState,
    selectEntities
);

export const selectActiveCalendarLessonDataId = createSelector(
    selectCalendarLessonDataState,
    getSelectedCalendarLessonDataId
);

export const selectActiveCalendarLessonData = createSelector(
    selectCalendarLessonData,
    selectActiveCalendarLessonDataId,
    (calendarLessonDataEntities, calendarLessonDataId) => calendarLessonDataEntities[calendarLessonDataId]
);
