import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import { CalendarEvent, DayDescriptor } from '../calendar.types';

@Component({
  tag: 'zijderoute-calendar-cell',
})
export class ZijderouteCalendarCellComponent {
  aspectRatio = { '--aspect-ratio': '1:1' };

  @Prop() day: DayDescriptor;
  @Prop() selectedDay: DayDescriptor;
  @Prop() events: CalendarEvent[];

  @Event() emitSelectDayEvent: EventEmitter;

  getEventCircles () {
    if (!this.events) {
      return null;
    }

    const numEvents = this.events.length;
    const maxEvents = 2;

    const eventsMarkup = [];
    for (let i = 0; i < numEvents; i += 1) {
      if (i === numEvents && numEvents > maxEvents) {
        // add a `+${numOfExtraEvents}` to the last circle if needed
        eventsMarkup.push(
          <div
            class="daily-events__event daily-events__event--additional"
            style={{ '--event-color': this.events[i].color }}
          >
          <span>
            +{numEvents - maxEvents}
          </span>
          </div>);
      } else if (i <= numEvents && i <= maxEvents) {
        eventsMarkup.push(
          <div
            class="daily-events__event"
            style={{ '--event-color': this.events[i].color }}
          >
          </div>);
      }
    }

    return eventsMarkup;
  }

  render () {
    const { day, selectedDay, emitSelectDayEvent, aspectRatio } = this;
    return (
      <div
        class={`
          calendar__body-cell
          ${day.isPrevMonth || day.isNextMonth ? 'calendar__body-cell--light' : ''}
          clickable
        `}
        style={aspectRatio}
        onClick={() => emitSelectDayEvent.emit(day)}
      >
        <div class="cell-body">
          <div
            class={`
              cell-body__number
              ${day.isToday ? 'cell-body__number--highlighted' : ''}
              ${selectedDay && day.formatted === selectedDay.formatted ? 'cell-body__number--selected' : ''}
            `}
          >
            <span>
              {day.number}
            </span>
          </div>
          <div
            class="daily-events"
          >
            {this.getEventCircles()}
          </div>

        </div>
      </div>
    );
  }
}
