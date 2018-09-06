import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StoreTeachingSubject } from './store-teaching-subject.model';
import { StoreTeachingSubjectActions, StoreTeachingSubjectActionTypes } from './store-teaching-subject.actions';

export interface State extends EntityState<StoreTeachingSubject> {
  // additional entities state properties
}

export const adapter: EntityAdapter<StoreTeachingSubject> = createEntityAdapter<StoreTeachingSubject>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: StoreTeachingSubjectActions
): State {
  switch (action.type) {
    case StoreTeachingSubjectActionTypes.AddStoreTeachingSubject: {
      return adapter.addOne(action.payload.storeTeachingSubject, state);
    }

    case StoreTeachingSubjectActionTypes.UpsertStoreTeachingSubject: {
      return adapter.upsertOne(action.payload.storeTeachingSubject, state);
    }

    case StoreTeachingSubjectActionTypes.AddStoreTeachingSubjects: {
      return adapter.addMany(action.payload.storeTeachingSubjects, state);
    }

    case StoreTeachingSubjectActionTypes.UpsertStoreTeachingSubjects: {
      return adapter.upsertMany(action.payload.storeTeachingSubjects, state);
    }

    case StoreTeachingSubjectActionTypes.UpdateStoreTeachingSubject: {
      return adapter.updateOne(action.payload.storeTeachingSubject, state);
    }

    case StoreTeachingSubjectActionTypes.UpdateStoreTeachingSubjects: {
      return adapter.updateMany(action.payload.storeTeachingSubjects, state);
    }

    case StoreTeachingSubjectActionTypes.DeleteStoreTeachingSubject: {
      return adapter.removeOne(action.payload.id, state);
    }

    case StoreTeachingSubjectActionTypes.DeleteStoreTeachingSubjects: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case StoreTeachingSubjectActionTypes.LoadStoreTeachingSubjects: {
      return adapter.addAll(action.payload.storeTeachingSubjects, state);
    }

    case StoreTeachingSubjectActionTypes.ClearStoreTeachingSubjects: {
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
