import { ZijderouteCalendarGrid } from './zijderoute-calendar-grid.component';
import { DayDescriptor } from '../calendar.types';

describe('<zijderoute-calendar-grid>', () => {
  describe('weekDays', () => {
    // Not possible due to limited Intl support in nodeJs
    it('should render correct days for NL', () => {});

    it('should render correct days for UK', () => {
      const myNavigator = navigator as any;
      myNavigator.language = 'en';
      const grid = new ZijderouteCalendarGrid();
      const enWeekDays = ['m', 't', 'w', 't', 'f', 's', 's'];
      grid.weekDays.forEach((day, i) => expect(day.toLowerCase()).toEqual(enWeekDays[i]));
    });
  });

  describe('getDayObject()', () => {
    const grid = new ZijderouteCalendarGrid();
    const date = new Date('2018-08-01');

    it('should render the correct DayDescriptor for cell 0 (prevMonth)', () => {
      const formattedDate = '2018-07-30';
      const day: DayDescriptor = grid.getDayObject({
        date,
        week: 0,
        weekDayNum: 1,
      });

      expect(day.number).toEqual(30);
      expect(day.formatted).toEqual(formattedDate);
      expect(day.isToday).toBe(false);
      expect(day.isPrevMonth).toBe(true);
      expect(day.isNextMonth).toBe(false);
    });

    it('should render the correct DayDescriptor for cell 7', () => {
      const formattedDate = '2018-08-08';
      const day: DayDescriptor = grid.getDayObject({
        date,
        week: 1,
        weekDayNum: 3,
      });

      expect(day.number).toBe(8);
      expect(day.formatted).toEqual(formattedDate);
      expect(day.isToday).toBe(false);
      expect(day.isPrevMonth).toBe(false);
      expect(day.isNextMonth).toBe(false);
    });

    it('should render the correct DayDescriptor for cell 42 (isNextMonth)', () => {
      const formattedDate = '2018-09-09';
      const day: DayDescriptor = grid.getDayObject({
        date,
        week: 5,
        weekDayNum: 7,
      });

      expect(day.number).toBe(9);
      expect(day.formatted).toEqual(formattedDate);
      expect(day.isToday).toBe(false);
      expect(day.isPrevMonth).toBe(false);
      expect(day.isNextMonth).toBe(true);
    });
  });
});
