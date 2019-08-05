import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserActions, UserActionTypes } from './user.actions';
import { User } from 'app/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface State extends EntityState<User> {
    // additional entities state properties
    current: number | null
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
    current: null
    // additional entity state properties
});

export function reducer(
    state = initialState,
    action: UserActions
): State {
    switch (action.type) {
        case UserActionTypes.AddUser: {
            return adapter.addOne(action.payload.user, state);
        }

        case UserActionTypes.UpsertUser: {
            return adapter.upsertOne(action.payload.user, state);
        }

        case UserActionTypes.AddUsers: {
            return adapter.addMany(action.payload.users, state);
        }

        case UserActionTypes.UpsertUsers: {
            return adapter.upsertMany(action.payload.users, state);
        }

        case UserActionTypes.UpdateUser: {
            return adapter.updateOne(action.payload.user, state);
        }

        case UserActionTypes.UpdateUsers: {
            return adapter.updateMany(action.payload.users, state);
        }

        case UserActionTypes.DeleteUser: {
            return adapter.removeOne(action.payload.id, state);
        }

        case UserActionTypes.DeleteUsers: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case UserActionTypes.LoadUsers: {
            return adapter.addAll(action.payload.users, state);
        }

        case UserActionTypes.ClearUsers: {
            return adapter.removeAll(state);
        }

        case UserActionTypes.CurrentUser: {
            return { ...state, current: action.payload.id };
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
    selectTotal
} = adapter.getSelectors();

export const getCurrentUserId = (state: State) => state.current;

export const selectUserState = createFeatureSelector<State>('user');

export const selectUserEntities = createSelector(
    selectUserState,
    selectEntities
);

export const selectCurrentUserId = createSelector(
    selectUserState,
    getCurrentUserId
);

export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => userId !== null? userEntities[userId]: null
);
