import { SubjectEvent } from 'app/shared/model/event.model';
import { Moment } from 'moment';

export interface CalendarSubjectEvent {
  id: number;
  start: Moment;
  end: Moment;
  subjectEvents: SubjectEvent[];
}
