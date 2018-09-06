import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';

export enum TeachingSubjectActionTypes {
  LoadTeachingSubjects = '[TeachingSubject] Load TeachingSubjects',
  AddTeachingSubject = '[TeachingSubject] Add TeachingSubject',
  UpsertTeachingSubject = '[TeachingSubject] Upsert TeachingSubject',
  AddTeachingSubjects = '[TeachingSubject] Add TeachingSubjects',
  UpsertTeachingSubjects = '[TeachingSubject] Upsert TeachingSubjects',
  UpdateTeachingSubject = '[TeachingSubject] Update TeachingSubject',
  UpdateTeachingSubjects = '[TeachingSubject] Update TeachingSubjects',
  DeleteTeachingSubject = '[TeachingSubject] Delete TeachingSubject',
  DeleteTeachingSubjects = '[TeachingSubject] Delete TeachingSubjects',
  ClearTeachingSubjects = '[TeachingSubject] Clear TeachingSubjects'
}

export class LoadTeachingSubjects implements Action {
  readonly type = TeachingSubjectActionTypes.LoadTeachingSubjects;

  constructor(public payload: { teachingSubjects: ITeachingSubject[] }) {}
}

export class AddTeachingSubject implements Action {
  readonly type = TeachingSubjectActionTypes.AddTeachingSubject;

  constructor(public payload: { teachingSubject: ITeachingSubject }) {}
}

export class UpsertTeachingSubject implements Action {
  readonly type = TeachingSubjectActionTypes.UpsertTeachingSubject;

  constructor(public payload: { teachingSubject: ITeachingSubject }) {}
}

export class AddTeachingSubjects implements Action {
  readonly type = TeachingSubjectActionTypes.AddTeachingSubjects;

  constructor(public payload: { teachingSubjects: ITeachingSubject[] }) {}
}

export class UpsertTeachingSubjects implements Action {
  readonly type = TeachingSubjectActionTypes.UpsertTeachingSubjects;

  constructor(public payload: { teachingSubjects: ITeachingSubject[] }) {}
}

export class UpdateTeachingSubject implements Action {
  readonly type = TeachingSubjectActionTypes.UpdateTeachingSubject;

  constructor(public payload: { teachingSubject: Update<ITeachingSubject> }) {}
}

export class UpdateTeachingSubjects implements Action {
  readonly type = TeachingSubjectActionTypes.UpdateTeachingSubjects;

  constructor(public payload: { teachingSubjects: Update<ITeachingSubject>[] }) {}
}

export class DeleteTeachingSubject implements Action {
  readonly type = TeachingSubjectActionTypes.DeleteTeachingSubject;

  constructor(public payload: { id: string }) {}
}

export class DeleteTeachingSubjects implements Action {
  readonly type = TeachingSubjectActionTypes.DeleteTeachingSubjects;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTeachingSubjects implements Action {
  readonly type = TeachingSubjectActionTypes.ClearTeachingSubjects;
}

export type TeachingSubjectActions =
 LoadTeachingSubjects
 | AddTeachingSubject
 | UpsertTeachingSubject
 | AddTeachingSubjects
 | UpsertTeachingSubjects
 | UpdateTeachingSubject
 | UpdateTeachingSubjects
 | DeleteTeachingSubject
 | DeleteTeachingSubjects
 | ClearTeachingSubjects;
