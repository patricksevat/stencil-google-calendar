var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from '@stencil/core';
import { addDays, differenceInCalendarMonths, format, getDate, getDay, isToday, setISODay } from 'date-fns';
let ZijderouteCalendarGrid = class ZijderouteCalendarGrid {
    constructor() {
        this.weekDays = getLocaleWeekdays(new Date());
    }
    render() {
        const cells = [];
        const columns = 7; // 1 for every day of the week
        const rows = 7; // 1 header, 6 weeks
        for (let i = 0; i < rows; i += 1) {
            for (let j = 1; j <= columns; j += 1) {
                // add days as headers of our grid table
                if (i === 0) {
                    cells.push(headerCell(this.weekDays[j - 1]));
                }
                else {
                    const day = getDayObject({
                        date: this.date,
                        week: i - 1,
                        weekDayNum: j,
                    });
                    cells.push(h("zijderoute-calendar-cell", { day: day, selectedDay: this.selected, events: this.events[day.formatted] }));
                }
            }
        }
        return cells;
    }
};
__decorate([
    Prop()
], ZijderouteCalendarGrid.prototype, "events", void 0);
__decorate([
    Prop()
], ZijderouteCalendarGrid.prototype, "date", void 0);
__decorate([
    Prop()
], ZijderouteCalendarGrid.prototype, "selected", void 0);
ZijderouteCalendarGrid = __decorate([
    Component({
        tag: 'zijderoute-calendar-grid',
        styleUrl: 'zijderoute-calendar-grid.scss',
    })
], ZijderouteCalendarGrid);
export { ZijderouteCalendarGrid };
function getDayObject({ date, week, weekDayNum }) {
    const remainingDaysInPrevMonth = getDay(date); // 3
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
function getLocaleWeekdays(date) {
    const weekdaysArr = [];
    for (let i = 1; i <= 7; i += 1) {
        const dayOfTheWeek = setISODay(date, i);
        weekdaysArr.push(dayOfTheWeek.toLocaleDateString(navigator.language, { weekday: 'narrow' }));
    }
    return weekdaysArr;
}
function headerCell(title) {
    return (h("p", { class: "calendar__body-header" }, title));
}
