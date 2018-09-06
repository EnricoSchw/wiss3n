import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { StoreTeachingSubject } from './store-teaching-subject.model';

export enum StoreTeachingSubjectActionTypes {
  LoadStoreTeachingSubjects = '[StoreTeachingSubject] Load StoreTeachingSubjects',
  AddStoreTeachingSubject = '[StoreTeachingSubject] Add StoreTeachingSubject',
  UpsertStoreTeachingSubject = '[StoreTeachingSubject] Upsert StoreTeachingSubject',
  AddStoreTeachingSubjects = '[StoreTeachingSubject] Add StoreTeachingSubjects',
  UpsertStoreTeachingSubjects = '[StoreTeachingSubject] Upsert StoreTeachingSubjects',
  UpdateStoreTeachingSubject = '[StoreTeachingSubject] Update StoreTeachingSubject',
  UpdateStoreTeachingSubjects = '[StoreTeachingSubject] Update StoreTeachingSubjects',
  DeleteStoreTeachingSubject = '[StoreTeachingSubject] Delete StoreTeachingSubject',
  DeleteStoreTeachingSubjects = '[StoreTeachingSubject] Delete StoreTeachingSubjects',
  ClearStoreTeachingSubjects = '[StoreTeachingSubject] Clear StoreTeachingSubjects'
}

export class LoadStoreTeachingSubjects implements Action {
  readonly type = StoreTeachingSubjectActionTypes.LoadStoreTeachingSubjects;

  constructor(public payload: { storeTeachingSubjects: StoreTeachingSubject[] }) {}
}

export class AddStoreTeachingSubject implements Action {
  readonly type = StoreTeachingSubjectActionTypes.AddStoreTeachingSubject;

  constructor(public payload: { storeTeachingSubject: StoreTeachingSubject }) {}
}

export class UpsertStoreTeachingSubject implements Action {
  readonly type = StoreTeachingSubjectActionTypes.UpsertStoreTeachingSubject;

  constructor(public payload: { storeTeachingSubject: StoreTeachingSubject }) {}
}

export class AddStoreTeachingSubjects implements Action {
  readonly type = StoreTeachingSubjectActionTypes.AddStoreTeachingSubjects;

  constructor(public payload: { storeTeachingSubjects: StoreTeachingSubject[] }) {}
}

export class UpsertStoreTeachingSubjects implements Action {
  readonly type = StoreTeachingSubjectActionTypes.UpsertStoreTeachingSubjects;

  constructor(public payload: { storeTeachingSubjects: StoreTeachingSubject[] }) {}
}

export class UpdateStoreTeachingSubject implements Action {
  readonly type = StoreTeachingSubjectActionTypes.UpdateStoreTeachingSubject;

  constructor(public payload: { storeTeachingSubject: Update<StoreTeachingSubject> }) {}
}

export class UpdateStoreTeachingSubjects implements Action {
  readonly type = StoreTeachingSubjectActionTypes.UpdateStoreTeachingSubjects;

  constructor(public payload: { storeTeachingSubjects: Update<StoreTeachingSubject>[] }) {}
}

export class DeleteStoreTeachingSubject implements Action {
  readonly type = StoreTeachingSubjectActionTypes.DeleteStoreTeachingSubject;

  constructor(public payload: { id: string }) {}
}

export class DeleteStoreTeachingSubjects implements Action {
  readonly type = StoreTeachingSubjectActionTypes.DeleteStoreTeachingSubjects;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearStoreTeachingSubjects implements Action {
  readonly type = StoreTeachingSubjectActionTypes.ClearStoreTeachingSubjects;
}

export type StoreTeachingSubjectActions =
 LoadStoreTeachingSubjects
 | AddStoreTeachingSubject
 | UpsertStoreTeachingSubject
 | AddStoreTeachingSubjects
 | UpsertStoreTeachingSubjects
 | UpdateStoreTeachingSubject
 | UpdateStoreTeachingSubjects
 | DeleteStoreTeachingSubject
 | DeleteStoreTeachingSubjects
 | ClearStoreTeachingSubjects;
