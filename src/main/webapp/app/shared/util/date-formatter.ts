import moment = require('moment');

export class DateFormatter {

    public static createHoursFromTimeString(timeString: string): number {
        return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate().getHours();
    }

    public static createMinutesFromTimeString(timeString: string): number {
        return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate().getMinutes();
    }

    public static createDateFromTimeString(timeString: string): Date {
        return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate();
    }
}
