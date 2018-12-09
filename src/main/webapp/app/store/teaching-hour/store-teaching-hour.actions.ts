import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';

export enum TeachingHourActionTypes {
  LoadTeachingHours = '[TeachingHour] Load TeachingHours',
  AddTeachingHour = '[TeachingHour] Add TeachingHour',
  UpsertTeachingHour = '[TeachingHour] Upsert TeachingHour',
  AddTeachingHours = '[TeachingHour] Add TeachingHours',
  UpsertTeachingHours = '[TeachingHour] Upsert TeachingHours',
  UpdateTeachingHour = '[TeachingHour] Update TeachingHour',
  UpdateTeachingHours = '[TeachingHour] Update TeachingHours',
  DeleteTeachingHour = '[TeachingHour] Delete TeachingHour',
  DeleteTeachingHours = '[TeachingHour] Delete TeachingHours',
  ClearTeachingHours = '[TeachingHour] Clear TeachingHours'
}

export class LoadTeachingHours implements Action {
  readonly type = TeachingHourActionTypes.LoadTeachingHours;

  constructor(public payload: { teachingHours: ITeachingHour[] }) {}
}

export class AddTeachingHour implements Action {
  readonly type = TeachingHourActionTypes.AddTeachingHour;

  constructor(public payload: { teachingHour: ITeachingHour }) {}
}

export class UpsertTeachingHour implements Action {
  readonly type = TeachingHourActionTypes.UpsertTeachingHour;

  constructor(public payload: { teachingHour: ITeachingHour }) {}
}

export class AddTeachingHours implements Action {
  readonly type = TeachingHourActionTypes.AddTeachingHours;

  constructor(public payload: { teachingHours: ITeachingHour[] }) {}
}

export class UpsertTeachingHours implements Action {
  readonly type = TeachingHourActionTypes.UpsertTeachingHours;

  constructor(public payload: { teachingHours: ITeachingHour[] }) {}
}

export class UpdateTeachingHour implements Action {
  readonly type = TeachingHourActionTypes.UpdateTeachingHour;

  constructor(public payload: { teachingHour: Update<ITeachingHour> }) {}
}

export class UpdateTeachingHours implements Action {
  readonly type = TeachingHourActionTypes.UpdateTeachingHours;

  constructor(public payload: { teachingHours: Update<ITeachingHour>[] }) {}
}

export class DeleteTeachingHour implements Action {
  readonly type = TeachingHourActionTypes.DeleteTeachingHour;

  constructor(public payload: { id: number }) {}
}

export class DeleteTeachingHours implements Action {
  readonly type = TeachingHourActionTypes.DeleteTeachingHours;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearTeachingHours implements Action {
  readonly type = TeachingHourActionTypes.ClearTeachingHours;
}

export type StoreTeachingHourActions =
 LoadTeachingHours
 | AddTeachingHour
 | UpsertTeachingHour
 | AddTeachingHours
 | UpsertTeachingHours
 | UpdateTeachingHour
 | UpdateTeachingHours
 | DeleteTeachingHour
 | DeleteTeachingHours
 | ClearTeachingHours;
