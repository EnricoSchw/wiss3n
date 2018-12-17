import { initialState, reducer } from 'app/store/calendar-lesson-data/store-calendar-lesson-data.reducer';


describe('CalendarLessonData Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
