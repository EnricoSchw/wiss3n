import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SchoolClassActions, SchoolClassActionTypes } from './store-school-class.actions';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<ISchoolClass> {
    // additional entities state properties
}

export const adapter: EntityAdapter<ISchoolClass> = createEntityAdapter<ISchoolClass>();

export const initialState: State = adapter.getInitialState({
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

        default: {
            return state;
        }
    }
}

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
