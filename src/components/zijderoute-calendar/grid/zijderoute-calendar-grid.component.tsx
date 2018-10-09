import { Component, Prop } from '@stencil/core';
import { CalendarEvents, DayDescriptor } from '../calendar.types';
import { addDays, differenceInCalendarMonths, format, getDate, getDay, isToday, setISODay } from 'date-fns';

@Component({
  tag: 'zijderoute-calendar-grid',
  styleUrl: 'zijderoute-calendar-grid.scss',
})
export class ZijderouteCalendarGrid {
  @Prop() events: CalendarEvents;
  @Prop() date: Date;
  @Prop() selected: DayDescriptor;

  weekDays = getLocaleWeekdays(new Date());

  render () {
    const cells = [];
    const columns = 7; // 1 for every day of the week
    const rows = 7; // 1 header, 6 weeks

    for (let i = 0; i < rows; i += 1) {
      for (let j = 1; j <= columns; j += 1) {
        // add days as headers of our grid table
        if (i === 0) {
          cells.push(headerCell(this.weekDays[j - 1]));
        } else {
          const day: DayDescriptor = getDayObject({
            date: this.date,
            week: i - 1,
            weekDayNum: j,
          });

          cells.push(
            <zijderoute-calendar-cell
              day={day}
              selectedDay={this.selected}
              events={this.events[day.formatted]}
            />);
        }
      }
    }

    return cells;
  }
}

function getDayObject({ date, week, weekDayNum }) : DayDescriptor {
  const remainingDaysInPrevMonth: number = getDay(date); // 3
  const cellNumber = week * 7 + weekDayNum;
  const dayDate = addDays(date, cellNumber - remainingDaysInPrevMonth);

  return {
    number: getDate(dayDate),
    isToday: isToday(dayDate),
    isPrevMonth: differenceInCalendarMonths(dayDate, date) === -1,
    isNextMonth: differenceInCalendarMonths(dayDate, date) === 1,
    formatted: format(dayDate, 'YYYY-MM-DD'),
  };
}

function getLocaleWeekdays(date: Date) {
  const weekdaysArr: string[] = [];
  for (let i = 1; i <= 7; i += 1) {
    const dayOfTheWeek: Date = setISODay(date, i);
    weekdaysArr.push(dayOfTheWeek.toLocaleDateString(navigator.language, { weekday: 'narrow' }));
  }
  return weekdaysArr;
}

function headerCell(title) {
  return (
    <p
      class="calendar__body-header"
    >
      {title}
    </p>
  );
}
