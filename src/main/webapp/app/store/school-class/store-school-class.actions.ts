import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ISchoolClass } from 'app/shared/model/school-class.model';

export enum SchoolClassActionTypes {
  LoadSchoolClasses = '[SchoolClass] Load SchoolClasses',
  AddSchoolClass = '[SchoolClass] Add SchoolClass',
  UpsertSchoolClass = '[SchoolClass] Upsert SchoolClass',
  AddSchoolClasses = '[SchoolClass] Add SchoolClasses',
  UpsertSchoolClasses = '[SchoolClass] Upsert SchoolClasses',
  UpdateSchoolClass = '[SchoolClass] Update SchoolClass',
  UpdateSchoolClasses = '[SchoolClass] Update SchoolClasses',
  DeleteSchoolClass = '[SchoolClass] Delete SchoolClass',
  DeleteSchoolClasses = '[SchoolClass] Delete SchoolClasses',
  ClearSchoolClasses = '[SchoolClass] Clear SchoolClasses'
}

export class LoadSchoolClasses implements Action {
  readonly type = SchoolClassActionTypes.LoadSchoolClasses;

  constructor(public payload: { schoolClasses: ISchoolClass[] }) {}
}

export class AddSchoolClass implements Action {
  readonly type = SchoolClassActionTypes.AddSchoolClass;

  constructor(public payload: { schoolClass: ISchoolClass }) {}
}

export class UpsertSchoolClass implements Action {
  readonly type = SchoolClassActionTypes.UpsertSchoolClass;

  constructor(public payload: { schoolClass: ISchoolClass }) {}
}

export class AddSchoolClasses implements Action {
  readonly type = SchoolClassActionTypes.AddSchoolClasses;

  constructor(public payload: { schoolClasses: ISchoolClass[] }) {}
}

export class UpsertSchoolClasses implements Action {
  readonly type = SchoolClassActionTypes.UpsertSchoolClasses;

  constructor(public payload: { schoolClasses: ISchoolClass[] }) {}
}

export class UpdateSchoolClass implements Action {
  readonly type = SchoolClassActionTypes.UpdateSchoolClass;

  constructor(public payload: { schoolClass: Update<ISchoolClass> }) {}
}

export class UpdateSchoolClasses implements Action {
  readonly type = SchoolClassActionTypes.UpdateSchoolClasses;

  constructor(public payload: { schoolClasses: Update<ISchoolClass>[] }) {}
}

export class DeleteSchoolClass implements Action {
  readonly type = SchoolClassActionTypes.DeleteSchoolClass;

  constructor(public payload: { id: number }) {}
}

export class DeleteSchoolClasses implements Action {
  readonly type = SchoolClassActionTypes.DeleteSchoolClasses;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearSchoolClasses implements Action {
  readonly type = SchoolClassActionTypes.ClearSchoolClasses;
}

export type SchoolClassActions =
 LoadSchoolClasses
 | AddSchoolClass
 | UpsertSchoolClass
 | AddSchoolClasses
 | UpsertSchoolClasses
 | UpdateSchoolClass
 | UpdateSchoolClasses
 | DeleteSchoolClass
 | DeleteSchoolClasses
 | ClearSchoolClasses;
