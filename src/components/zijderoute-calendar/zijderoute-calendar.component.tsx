import { Component, Prop, State, Listen } from '@stencil/core';
import {
  addMonths,
  endOfMonth,
} from 'date-fns';

import { CalendarEvent, CalendarEvents, DayDescriptor, TGetCalendarEventOptions } from './calendar.types';
import { getCalendarEvents } from './google-calendar-integration';

@Component({
  tag: 'zijderoute-calendar',
  styleUrl: 'zijderoute-calendar.scss',
  shadow: true,
})
export class ZijderouteCalendar {
  date: Date = new Date();
  selectedYear: number = this.date.getFullYear();
  colors: string[] = ['#cddc3a', '#ffbf00', '#9417aa'];
  localeOptions = { month: 'long' };

  @Prop() serviceAccountEmail: string;
  @Prop() calendarId: string;
  @Prop() tokenSignUrl: string;
  @Prop() includePrivateEvents: string;

  @State() firstOfMonthDate: Date = new Date(`${this.selectedYear}-${this.date.getMonth() + 1}`);
  @State() events: CalendarEvents = {};
  @State() selectedDay: DayDescriptor;

  handleMonthChange (num) {
    this.firstOfMonthDate = addMonths(this.firstOfMonthDate, num ? 1 : -1);
    this.selectedYear = this.firstOfMonthDate.getFullYear();

    this.retrieveEvents()
    .catch(console.error);
  }

  @Listen('emitSelectDayEvent')
  selectDay (ev: CustomEvent) {
    const day = ev.detail;
    if (this.selectedDay && this.selectedDay.formatted === day.formatted) {
      this.selectedDay = null;
    } else {
      this.selectedDay = Object.assign({}, day);
    }
  }

  retrieveEvents (): Promise<void> {
    const { calendarId, serviceAccountEmail, firstOfMonthDate, includePrivateEvents } = this;
    const options: TGetCalendarEventOptions = {
      calendarId,
      serviceAccountEmail,
      firstOfMonthDate,
      endOfMonthDate: endOfMonth(firstOfMonthDate),
      backEndUrl: this.tokenSignUrl,
      includePrivateEvents,
    };
    return getCalendarEvents(options)
    .then((events) => {
      Object.keys(events).forEach((key) => {
        events[key].forEach((calendarEvent: CalendarEvent, index) => {
          calendarEvent.color = this.colors[index % 3];
        });
      });
      this.events = events;
    });
  }

  componentWillLoad(): void {
    this.retrieveEvents()
    .catch(console.error);
  }

  render() {
    return (
      <div class="calendar">
        <div class="calendar__header">
          <div class="calendar__header-content">
            <h3 class="calendar__header-content-headline">
              {this.selectedYear}
            </h3>
            <div class="calendar__header-content-subline">
              <zijderoute-arrow-left
                class="calendar__header-content-subline-month-selector clickable"
                fill-color="#ffffff"
                onClick={() => this.handleMonthChange(0)}
              />
              <h4>
                {this.firstOfMonthDate.toLocaleString(navigator.language, this.localeOptions)}
              </h4>
              <zijderoute-arrow-right
                class="calendar__header-content-subline-month-selector clickable"
                fill-color="#ffffff"
                onClick={() => this.handleMonthChange(1)}
              />
            </div>
          </div>
          <div class="calendar__header-icon">
          </div>
        </div>
        <hr class="calendar__divider"/>
        <div class="calendar__body">
          <zijderoute-calendar-grid
            date={this.firstOfMonthDate}
            events={this.events}
            selected={this.selectedDay}
          />
        </div>
        <div class="calendar__actions">
          <zijderoute-calendar-details
            events={this.selectedDay && this.events[this.selectedDay.formatted]}
            selected={this.selectedDay}
          />
        </div>
      </div>);
  }
}
