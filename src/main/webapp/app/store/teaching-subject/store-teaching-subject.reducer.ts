import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import {
    TeachingSubjectActions, TeachingSubjectActionTypes
} from 'app/store/teaching-subject/store-teaching-subject.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<ITeachingSubject> {
    // additional entities state properties
}

export const adapter: EntityAdapter<ITeachingSubject> = createEntityAdapter<ITeachingSubject>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
});

export function reducer(
    state = initialState,
    action: TeachingSubjectActions
): State {
    switch (action.type) {
        case TeachingSubjectActionTypes.AddTeachingSubject: {
            return adapter.addOne(action.payload.teachingSubject, state);
        }

        case TeachingSubjectActionTypes.UpsertTeachingSubject: {
            return adapter.upsertOne(action.payload.teachingSubject, state);
        }

        case TeachingSubjectActionTypes.AddTeachingSubjects: {
            return adapter.addMany(action.payload.teachingSubjects, state);
        }

        case TeachingSubjectActionTypes.UpsertTeachingSubjects: {
            return adapter.upsertMany(action.payload.teachingSubjects, state);
        }

        case TeachingSubjectActionTypes.UpdateTeachingSubject: {
            return adapter.updateOne(action.payload.teachingSubject, state);
        }

        case TeachingSubjectActionTypes.UpdateTeachingSubjects: {
            return adapter.updateMany(action.payload.teachingSubjects, state);
        }

        case TeachingSubjectActionTypes.DeleteTeachingSubject: {
            return adapter.removeOne(action.payload.id, state);
        }

        case TeachingSubjectActionTypes.DeleteTeachingSubjects: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case TeachingSubjectActionTypes.LoadTeachingSubjects: {
            return adapter.addAll(action.payload.teachingSubjects, state);
        }

        case TeachingSubjectActionTypes.ClearTeachingSubjects: {
            return adapter.removeAll(state);
        }

        default: {
            return state;
        }
    }
}

// Selectors: CalendarSubjectEvent
export const selectTeachingSubjectState = createFeatureSelector<State>('teachingSubject');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();

export const selectAllTeachingSubjects = createSelector(
    selectTeachingSubjectState,
    selectAll
);