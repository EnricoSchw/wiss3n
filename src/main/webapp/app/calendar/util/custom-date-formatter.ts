import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import moment = require('moment');
import { Moment } from 'moment';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

    public dayViewHour({date, locale}: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'H', locale);
    }

    public calendartHourTime = (date: Moment, timeString: string): Date => {
        date.format('2018-04-01T');
        return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate();
    };

}
