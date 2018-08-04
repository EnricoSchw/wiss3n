import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './reducers';
import { APP_ENVIRONMENT } from '../app.constants';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      APP_ENVIRONMENT !== 'production' ? StoreDevtoolsModule.instrument() : [],
      EffectsModule.forRoot([AppEffects]),
  ],
  declarations: []
})
export class Wiss3NStoreModule { }
