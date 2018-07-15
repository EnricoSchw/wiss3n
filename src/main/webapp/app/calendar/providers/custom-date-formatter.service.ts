import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable()
export class CustomDateFormatterService extends CalendarDateFormatter {

    public dayViewHour({date, locale}: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'H', locale);
    }

}
