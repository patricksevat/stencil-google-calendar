import { ZijderouteCalendar } from './zijderoute-calendar.component';

describe('my-component', () => {
  it('builds', () => {
    expect(new ZijderouteCalendar()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      // const component = new ZijderouteCalendar();
      // expect(component.format()).toEqual('');
    });

    it('formats just first names', () => {
      // const component = new ZijderouteCalendar();
      // component.first = 'Joseph';
      // expect(component.format()).toEqual('Joseph');
    });

    it('formats first and last names', () => {
      // const component = new ZijderouteCalendar();
      // component.first = 'Joseph';
      // component.last = 'Publique';
      // expect(component.format()).toEqual('Joseph Publique');
    });

    it('formats first, middle and last names', () => {
      // const component = new ZijderouteCalendar();
      // component.first = 'Joseph';
      // component.middle = 'Quincy';
      // component.last = 'Publique';
      // expect(component.format()).toEqual('Joseph Quincy Publique');
    });
  });
});
