export interface SubjectHour {
    start: Date,
    end: Date,
}

export const firstHour = <SubjectHour>{
    start: new Date('2018-04-24T08:15:00'),
    end:  new Date('2018-04-24T09:00:00')
};

export const secondHour = <SubjectHour> {
     start : new Date('2018-04-24T09:05:00'),
     end : new Date('2018-04-24T09:50:00')
};

export const thirdHour = <SubjectHour> {
    start: new Date('2018-04-24T10:00:00'),
    end: new Date('2018-04-24T10:50:00')
};

export const fourthHour = <SubjectHour> {
    start: new Date('2018-04-24T11:00:00'),
    end: new Date('2018-04-24T11:45:00')
};


export const fifthHour = <SubjectHour> {
    start: new Date('2018-04-24T12:05:00'),
    end: new Date('2018-04-24T12:50:00')
};

export const sixthHour = <SubjectHour> {
    start: new Date('2018-04-24T12:55:00'),
    end: new Date('2018-04-24T13:10:00')
};

export const seventhHour = <SubjectHour> {
    start: new Date('2018-04-24T13:45:00'),
    end: new Date('2018-04-24T14:35:00')
};
