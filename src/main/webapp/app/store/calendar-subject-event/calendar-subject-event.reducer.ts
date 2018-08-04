import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CalendarSubjectEvent } from './calendar-subject-event.model';
import { CalendarSubjectEventActions, CalendarSubjectEventActionTypes } from './calendar-subject-event.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivateCalendarSubjectEvent } from 'app/store/calendar-subject-event/calendar-subject-event.actions';

export interface State extends EntityState<CalendarSubjectEvent> {
    // additional entities state properties
    selectedCalendarSubjectEventId: number | null;
}

export const adapter: EntityAdapter<CalendarSubjectEvent> = createEntityAdapter<CalendarSubjectEvent>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedCalendarSubjectEventId: null
});

export function reducer(
    state = initialState,
    action: CalendarSubjectEventActions
): State {
    switch (action.type) {
        case CalendarSubjectEventActionTypes.AddCalendarSubjectEvent: {
            return adapter.addOne(action.payload.calendarSubjectEvent, state);
        }

        case CalendarSubjectEventActionTypes.UpsertCalendarSubjectEvent: {
            return adapter.upsertOne(action.payload.calendarSubjectEvent, state);
        }

        case CalendarSubjectEventActionTypes.AddCalendarSubjectEvents: {
            return adapter.addMany(action.payload.calendarSubjectEvents, state);
        }

        case CalendarSubjectEventActionTypes.UpsertCalendarSubjectEvents: {
            return adapter.upsertMany(action.payload.calendarSubjectEvents, state);
        }

        case CalendarSubjectEventActionTypes.UpdateCalendarSubjectEvent: {
            return adapter.updateOne(action.payload.calendarSubjectEvent, state);
        }

        case CalendarSubjectEventActionTypes.UpdateCalendarSubjectEvents: {
            return adapter.updateMany(action.payload.calendarSubjectEvents, state);
        }

        case CalendarSubjectEventActionTypes.DeleteCalendarSubjectEvent: {
            return adapter.removeOne(action.payload.id, state);
        }

        case CalendarSubjectEventActionTypes.DeleteCalendarSubjectEvents: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case CalendarSubjectEventActionTypes.LoadCalendarSubjectEvents: {
            return adapter.addAll(action.payload.calendarSubjectEvents, { ...state, selectedCalendarSubjectEventId: null });
        }

        case CalendarSubjectEventActionTypes.ClearCalendarSubjectEvents: {
            return adapter.removeAll({ ...state, selectedCalendarSubjectEventId: null });
        }

        case CalendarSubjectEventActionTypes.ActivateCalendarSubjectEvent: {
            return { ...state, selectedCalendarSubjectEventId: action.payload.id };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedCalendarSubjectEventId = (state: State) => state.selectedCalendarSubjectEventId;

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();


// Selectors: CalendarSubjectEvent
export const selectCalendarSubjectEventState = createFeatureSelector<State>('calendarSubjectEvent');

export const selectCalendarSubjectEvent = createSelector(
    selectCalendarSubjectEventState,
    selectEntities
);

export const selectActiveCalendarSubjectEventId = createSelector(
    selectCalendarSubjectEventState,
    getSelectedCalendarSubjectEventId
);

export const selectActiveCalendarSubjectEvent = createSelector(
    selectCalendarSubjectEvent,
    selectActiveCalendarSubjectEventId,
    (calendarSubjectEventEntities, calendarSubjectEventId) => calendarSubjectEventEntities[calendarSubjectEventId]
);
