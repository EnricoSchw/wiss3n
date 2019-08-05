import { Injectable } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Principal, User } from 'app/core';
import { State } from 'app/store/school-class/store-school-class.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectCurrentUser } from 'app/store/user/user.reducer';
import { CurrentUser, UpsertUser } from 'app/store/user/user.actions';

@Injectable({
    providedIn: 'root'
})
export class StoreUserService {

    constructor(
        private store: Store<State>,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
        this.init();
    }

    public init() {
        this.readPrincipal();
        this.eventManager.subscribe('authenticationSuccess', () => {
            this.readPrincipal();
        });
    }

    public addCurrentUser(user: User) {
        this.add(user);
        this.setCurrentUserId(user.id);
    }

    public add(user: User) {
        this.store.dispatch(new UpsertUser({user}));
    }

    public getCurrentUser(): Observable<User | null> {
        return this.store.pipe(select(selectCurrentUser));
    }

    public setCurrentUserId(id: number) {
        this.store.dispatch(new CurrentUser({id}));
    }

    private readPrincipal(): void {
        this.principal.identity().then(user => {
            if(user !== null) {
                this.addCurrentUser(user);
            }
        });
    }
}
