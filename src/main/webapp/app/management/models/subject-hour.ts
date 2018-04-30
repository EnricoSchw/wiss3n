export interface SubjectHour {
    start: Date,
    end: Date,
}

export class FirstHour implements SubjectHour{
    public start = new Date('2018-04-24T08:15:00');
    public end = new Date('2018-04-24T09:00:00');
}

export class SecondHour implements SubjectHour{
    public start = new Date('2018-04-24T09:05:00');
    public end = new Date('2018-04-24T09:50:00');
}

export class ThirdHour implements SubjectHour{
    public start = new Date('2018-04-24T10:00:00');
    public end = new Date('2018-04-24T10:50:00');
}

export class FourthHour implements SubjectHour{
    public start = new Date('2018-04-24T11:00:00');
    public end = new Date('2018-04-24T11:45:00');
}


export class FifthHour implements SubjectHour{
    public start = new Date('2018-04-24T12:05:00');
    public end = new Date('2018-04-24T12:50:00');
}

export class SixthHour implements SubjectHour{
    public start = new Date('2018-04-24T12:55:00');
    public end = new Date('2018-04-24T13:10:00');
}

export class SeventhHour implements SubjectHour{
    public start = new Date('2018-04-24T13:45:00');
    public end = new Date('2018-04-24T14:35:00');
}
