import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SchoolClassActions, SchoolClassActionTypes } from './store-school-class.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreSchoolClass } from 'app/shared/model/school-class.model';

export interface State extends EntityState<StoreSchoolClass> {
    // additional entities state properties
    selectedSchoolClassId: number | null;
}

export const adapter: EntityAdapter<StoreSchoolClass> = createEntityAdapter<StoreSchoolClass>();

export const initialState: State = adapter.getInitialState({
    selectedSchoolClassId: null
    // additional entity state properties
});

export function reducer(
    state = initialState,
    action: SchoolClassActions
): State {
    switch (action.type) {
        case SchoolClassActionTypes.AddSchoolClass: {
            return adapter.addOne(action.payload.schoolClass, state);
        }

        case SchoolClassActionTypes.UpsertSchoolClass: {
            return adapter.upsertOne(action.payload.schoolClass, state);
        }

        case SchoolClassActionTypes.AddSchoolClasses: {
            return adapter.addMany(action.payload.schoolClasses, state);
        }

        case SchoolClassActionTypes.UpsertSchoolClasses: {
            return adapter.upsertMany(action.payload.schoolClasses, state);
        }

        case SchoolClassActionTypes.UpdateSchoolClass: {
            return adapter.updateOne(action.payload.schoolClass, state);
        }

        case SchoolClassActionTypes.UpdateSchoolClasses: {
            return adapter.updateMany(action.payload.schoolClasses, state);
        }

        case SchoolClassActionTypes.DeleteSchoolClass: {
            return adapter.removeOne(action.payload.id, state);
        }

        case SchoolClassActionTypes.DeleteSchoolClasses: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case SchoolClassActionTypes.LoadSchoolClasses: {
            return adapter.addAll(action.payload.schoolClasses, state);
        }

        case SchoolClassActionTypes.ClearSchoolClasses: {
            return adapter.removeAll(state);
        }

        case SchoolClassActionTypes.ActivateSchoolClass: {
            return { ...state, selectedSchoolClassId: action.payload.id };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedSchoolClassId = (state: State) => state.selectedSchoolClassId;

export const selectSchoolClassState = createFeatureSelector<State>('schoolClass');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();

export const selectAllSchoolClasses = createSelector(
    selectSchoolClassState,
    selectAll
);

export const selectSchoolClassEntities = createSelector(
    selectSchoolClassState,
    selectEntities
);

export const selectSchoolClass = (id: number) => createSelector(
    selectSchoolClassEntities,
    schoolClasses => schoolClasses[id]
);

export const selectActiveSchoolClassId = createSelector(
    selectSchoolClassState,
    getSelectedSchoolClassId
);

export const selectActiveSchoolClass = createSelector(
    selectSchoolClassEntities,
    selectActiveSchoolClassId,
    (schoolClassEntities, schoolClassId) => schoolClassEntities[schoolClassId]
);
