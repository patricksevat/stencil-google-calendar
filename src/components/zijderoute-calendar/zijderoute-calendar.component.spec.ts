import { ZijderouteCalendar } from './zijderoute-calendar.component';

describe('<zijderoute-calendar>', () => {
  it('should build', () => {
    expect(new ZijderouteCalendar()).toBeTruthy();
  });

  describe('handleMonthChange()', () => {
    const component = new ZijderouteCalendar();
    component.retrieveEvents = () => Promise.resolve();
    component.firstOfMonthDate = new Date('2018-01');

    it('should handle next month', () => {
      expect(component.firstOfMonthDate.getUTCMonth()).toEqual(0);
      component.handleMonthChange(true);
      expect(component.firstOfMonthDate.getUTCMonth()).toEqual(1);
    });

    it('should handle previous month', () => {
      expect(component.firstOfMonthDate.getUTCMonth()).toEqual(1);
      component.handleMonthChange(false);
      component.handleMonthChange(false);
      expect(component.firstOfMonthDate.getUTCMonth()).toEqual(11);
      expect(component.firstOfMonthDate.getUTCFullYear()).toEqual(2017);
    });
  });

  describe('retrieveEvents()', () => {
    const component = new ZijderouteCalendar();
    component.retrieveEvents = jest.fn(() =>
      new Promise((resolve) => resolve()));

    it('should call retrieveEvents on load', () => {
      expect(component.retrieveEvents.mock.calls[0]).toBeUndefined();
      component.componentWillLoad();
      expect(component.retrieveEvents.mock.calls[0]).toBeDefined();
    });

    it('should call retrieveEvents on handleMonthChange()', () => {
      expect(component.retrieveEvents.mock.calls[1]).toBeUndefined();
      component.handleMonthChange(1);
      expect(component.retrieveEvents.mock.calls[1]).toBeDefined();
    });
  });

  // TODO see if we can test this
  xdescribe('selectDay', () => {
    it('should listen to event', () => {
    });
  });
});
