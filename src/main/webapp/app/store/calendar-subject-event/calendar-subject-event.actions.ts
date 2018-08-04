import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CalendarSubjectEvent } from './calendar-subject-event.model';

export enum CalendarSubjectEventActionTypes {
  LoadCalendarSubjectEvents = '[CalendarSubjectEvent] Load CalendarSubjectEvents',
  AddCalendarSubjectEvent = '[CalendarSubjectEvent] Add CalendarSubjectEvent',
  UpsertCalendarSubjectEvent = '[CalendarSubjectEvent] Upsert CalendarSubjectEvent',
  AddCalendarSubjectEvents = '[CalendarSubjectEvent] Add CalendarSubjectEvents',
  UpsertCalendarSubjectEvents = '[CalendarSubjectEvent] Upsert CalendarSubjectEvents',
  UpdateCalendarSubjectEvent = '[CalendarSubjectEvent] Update CalendarSubjectEvent',
  UpdateCalendarSubjectEvents = '[CalendarSubjectEvent] Update CalendarSubjectEvents',
  DeleteCalendarSubjectEvent = '[CalendarSubjectEvent] Delete CalendarSubjectEvent',
  DeleteCalendarSubjectEvents = '[CalendarSubjectEvent] Delete CalendarSubjectEvents',
  ActivateCalendarSubjectEvent = '[CalendarSubjectEvent] Activate CalendarSubjectEvent',
  ClearCalendarSubjectEvents = '[CalendarSubjectEvent] Clear CalendarSubjectEvents'
}

export class LoadCalendarSubjectEvents implements Action {
  readonly type = CalendarSubjectEventActionTypes.LoadCalendarSubjectEvents;

  constructor(public payload: { calendarSubjectEvents: CalendarSubjectEvent[] }) {}
}

export class AddCalendarSubjectEvent implements Action {
  readonly type = CalendarSubjectEventActionTypes.AddCalendarSubjectEvent;

  constructor(public payload: { calendarSubjectEvent: CalendarSubjectEvent }) {}
}

export class UpsertCalendarSubjectEvent implements Action {
  readonly type = CalendarSubjectEventActionTypes.UpsertCalendarSubjectEvent;

  constructor(public payload: { calendarSubjectEvent: CalendarSubjectEvent }) {}
}

export class AddCalendarSubjectEvents implements Action {
  readonly type = CalendarSubjectEventActionTypes.AddCalendarSubjectEvents;

  constructor(public payload: { calendarSubjectEvents: CalendarSubjectEvent[] }) {}
}

export class UpsertCalendarSubjectEvents implements Action {
  readonly type = CalendarSubjectEventActionTypes.UpsertCalendarSubjectEvents;

  constructor(public payload: { calendarSubjectEvents: CalendarSubjectEvent[] }) {}
}

export class UpdateCalendarSubjectEvent implements Action {
  readonly type = CalendarSubjectEventActionTypes.UpdateCalendarSubjectEvent;

  constructor(public payload: { calendarSubjectEvent: Update<CalendarSubjectEvent> }) {}
}

export class UpdateCalendarSubjectEvents implements Action {
  readonly type = CalendarSubjectEventActionTypes.UpdateCalendarSubjectEvents;

  constructor(public payload: { calendarSubjectEvents: Update<CalendarSubjectEvent>[] }) {}
}

export class DeleteCalendarSubjectEvent implements Action {
  readonly type = CalendarSubjectEventActionTypes.DeleteCalendarSubjectEvent;

  constructor(public payload: { id: number }) {}
}

export class DeleteCalendarSubjectEvents implements Action {
  readonly type = CalendarSubjectEventActionTypes.DeleteCalendarSubjectEvents;

  constructor(public payload: { ids: number[] }) {}
}

export class ActivateCalendarSubjectEvent implements Action {
    readonly type = CalendarSubjectEventActionTypes.ActivateCalendarSubjectEvent;

    constructor(public payload: { id: number }) {}
}

export class ClearCalendarSubjectEvents implements Action {
  readonly type = CalendarSubjectEventActionTypes.ClearCalendarSubjectEvents;
}

export type CalendarSubjectEventActions =
 LoadCalendarSubjectEvents
 | AddCalendarSubjectEvent
 | UpsertCalendarSubjectEvent
 | AddCalendarSubjectEvents
 | UpsertCalendarSubjectEvents
 | UpdateCalendarSubjectEvent
 | UpdateCalendarSubjectEvents
 | DeleteCalendarSubjectEvent
 | DeleteCalendarSubjectEvents
 | ActivateCalendarSubjectEvent
 | ClearCalendarSubjectEvents;
