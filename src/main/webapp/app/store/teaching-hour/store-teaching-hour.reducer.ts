import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StoreTeachingHourActions, TeachingHourActionTypes } from './store-teaching-hour.actions';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    selectTeachingSubjectEntities, selectTeachingSubjectState
} from 'app/store/teaching-subject/store-teaching-subject.reducer';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';

export interface State extends EntityState<ITeachingHour> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ITeachingHour> = createEntityAdapter<ITeachingHour>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: StoreTeachingHourActions
): State {
  switch (action.type) {
    case TeachingHourActionTypes.AddTeachingHour: {
      return adapter.addOne(action.payload.teachingHour, state);
    }

    case TeachingHourActionTypes.UpsertTeachingHour: {
      return adapter.upsertOne(action.payload.teachingHour, state);
    }

    case TeachingHourActionTypes.AddTeachingHours: {
      return adapter.addMany(action.payload.teachingHours, state);
    }

    case TeachingHourActionTypes.UpsertTeachingHours: {
      return adapter.upsertMany(action.payload.teachingHours, state);
    }

    case TeachingHourActionTypes.UpdateTeachingHour: {
      return adapter.updateOne(action.payload.teachingHour, state);
    }

    case TeachingHourActionTypes.UpdateTeachingHours: {
      return adapter.updateMany(action.payload.teachingHours, state);
    }

    case TeachingHourActionTypes.DeleteTeachingHour: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TeachingHourActionTypes.DeleteTeachingHours: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TeachingHourActionTypes.LoadTeachingHours: {
      return adapter.addAll(action.payload.teachingHours, state);
    }

    case TeachingHourActionTypes.ClearTeachingHours: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// Selectors: CalendarSubjectEvent
export const selectTeachingHourState = createFeatureSelector<State>('teachingHour');

export const selectAllTeachingHours = createSelector(
    selectTeachingHourState,
    selectAll
);

export const selectTeachingHourEntities = createSelector(
    selectTeachingHourState,
    selectEntities
);

export const selectAllTeachingHoursById = (ids: number[]) => createSelector(
    selectTeachingHourEntities,
    teachingHours => {
        const list: ITeachingHour[] = [];
        ids.forEach(id => {
            list.push(teachingHours[id]);
        });
        return list;
    }
);

export const selectTeachingHour = (id: number) => createSelector(
    selectTeachingHourEntities,
    teachingHour => teachingHour[id]
);
