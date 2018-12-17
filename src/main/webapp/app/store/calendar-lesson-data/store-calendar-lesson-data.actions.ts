import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CalendarLessonData } from 'app/shared/model/calendar-lesson-data.model';

export enum CalendarLessonDataActionTypes {
  LoadCalendarLessonDataSet = '[CalendarLessonData] Load All CalendarLessonData',
  AddCalendarLessonData = '[CalendarLessonData] Add CalendarLessonData',
  UpsertCalendarLessonData = '[CalendarLessonData] Upsert CalendarLessonData',
  AddCalendarLessonDataSet = '[CalendarLessonData] Add All CalendarLessonData',
  UpsertCalendarLessonDataSet = '[CalendarLessonData] Upsert All CalendarLessonData',
  UpdateCalendarLessonData = '[CalendarLessonData] Update CalendarLessonData',
  UpdateCalendarLessonDataSet = '[CalendarLessonData] Update All CalendarLessonData',
  DeleteCalendarLessonData = '[CalendarLessonData] Delete CalendarLessonData',
  DeleteCalendarLessonDataSet = '[CalendarLessonData] Delete All CalendarLessonData',
  ActivateCalendarLessonData = '[CalendarLessonData] Activate CalendarLessonData',
  ClearCalendarLessonDataSet = '[CalendarLessonData] Clear All CalendarLessonData'
}

export class LoadCalendarLessonDataSet implements Action {
  readonly type = CalendarLessonDataActionTypes.LoadCalendarLessonDataSet;

  constructor(public payload: { calendarLessonDataSet: CalendarLessonData[] }) {}
}

export class AddCalendarLessonData implements Action {
  readonly type = CalendarLessonDataActionTypes.AddCalendarLessonData;

  constructor(public payload: { calendarLessonData: CalendarLessonData }) {}
}

export class UpsertCalendarLessonData implements Action {
  readonly type = CalendarLessonDataActionTypes.UpsertCalendarLessonData;

  constructor(public payload: { calendarLessonData: CalendarLessonData }) {}
}

export class AddCalendarLessonDataSet implements Action {
  readonly type = CalendarLessonDataActionTypes.AddCalendarLessonDataSet;

  constructor(public payload: { calendarLessonDataSet: CalendarLessonData[] }) {}
}

export class UpsertCalendarLessonDataSet implements Action {
  readonly type = CalendarLessonDataActionTypes.UpsertCalendarLessonDataSet;

  constructor(public payload: { calendarLessonDataSet: CalendarLessonData[] }) {}
}

export class UpdateCalendarLessonData implements Action {
  readonly type = CalendarLessonDataActionTypes.UpdateCalendarLessonData;

  constructor(public payload: { calendarLessonData: Update<CalendarLessonData> }) {}
}

export class UpdateCalendarLessonDataSet implements Action {
  readonly type = CalendarLessonDataActionTypes.UpdateCalendarLessonDataSet;

  constructor(public payload: { calendarLessonDataSet: Update<CalendarLessonData>[] }) {}
}

export class DeleteCalendarLessonData implements Action {
  readonly type = CalendarLessonDataActionTypes.DeleteCalendarLessonData;

  constructor(public payload: { id: number }) {}
}

export class DeleteCalendarLessonDataSet implements Action {
  readonly type = CalendarLessonDataActionTypes.DeleteCalendarLessonDataSet;

  constructor(public payload: { ids: number[] }) {}
}

export class ActivateCalendarLessonData implements Action {
    readonly type = CalendarLessonDataActionTypes.ActivateCalendarLessonData;

    constructor(public payload: { id: number }) {}
}

export class ClearCalendarLessonDataSet implements Action {
  readonly type = CalendarLessonDataActionTypes.ClearCalendarLessonDataSet;
}

export type CalendarLessonDataActions =
 LoadCalendarLessonDataSet
 | AddCalendarLessonData
 | UpsertCalendarLessonData
 | AddCalendarLessonDataSet
 | UpsertCalendarLessonDataSet
 | UpdateCalendarLessonData
 | UpdateCalendarLessonDataSet
 | DeleteCalendarLessonData
 | DeleteCalendarLessonDataSet
 | ActivateCalendarLessonData
 | ClearCalendarLessonDataSet;
