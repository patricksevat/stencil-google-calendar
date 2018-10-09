import { Component, Element, Prop } from '@stencil/core';
import { CalendarEvent, DayDescriptor, VISIBILITY_TYPES } from '../calendar.types';

@Component({
  tag: 'zijderoute-calendar-details',
  styleUrl: 'zijderoute-calendar-details.scss',
})
export class ZijderouteCalendarDetails {
  @Prop() events: CalendarEvent[];
  @Prop() selected: DayDescriptor;
  @Element() el: HTMLElement;

  container: HTMLElement;

  componentDidLoad () {
    this.container = this.el.querySelector('.calendar-details__container');
  }

  componentDidUpdate () {
    const isExpanded = this.container.classList.contains('calendar-details__container--empty');
    const transitionMemo = this.container.style.transition;
    this.container.style.transition = '';

    requestAnimationFrame(() => {
      const totalHeight = Array.from(this.container.childNodes)
        .reduce((acc, node: HTMLElement) => acc + node.scrollHeight, 0);
      const elHeight = isExpanded ? 16 : totalHeight;
      this.container.style.transition = transitionMemo;
      this.container.style.height = `${elHeight}px`;
    });
  }

  render () {
    if (!this.selected || !this.events || !Array.isArray(this.events) || this.events.length === 0) {
      return <div class="calendar-details__container calendar-details__container--empty" />;
    }

    return (
      <div class="calendar-details__container">
        {this.events.map((event: CalendarEvent) => {
          const isPublic = event.visibility === VISIBILITY_TYPES.PUBLIC;
          return (
            <div class="event-detail__container">
              <zijderoute-calendar-icon
                class="event-detail__icon"
                fill-color={event.color}
                background-color="#ffffff"
              />
              <div
                class="event-detail__body"
              >
                <p class="event-detail__data event-detail__data--title">
                  { isPublic ? event.summary : 'Private appointment' }
                </p>
                <p class="event-detail__data event-detail__data--location">
                  { isPublic ? event.location : 'Private location' }
                </p>
                <p class="event-detail__data event-detail__data--time">
                  {event.start.dateTime.substr(11, 5)} - {event.end.dateTime.substr(11, 5)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
