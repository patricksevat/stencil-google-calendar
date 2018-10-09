var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, State, Listen } from '@stencil/core';
import { addMonths, endOfMonth, } from 'date-fns';
import { getCalendarEvents } from './google-calendar-integration';
let ZijderouteCalendar = class ZijderouteCalendar {
    constructor() {
        this.date = new Date();
        this.selectedYear = this.date.getFullYear();
        this.colors = ['#cddc3a', '#ffbf00', '#9417aa'];
        this.localeOptions = { month: 'long' };
        this.firstOfMonthDate = new Date(`${this.selectedYear}-${this.date.getMonth() + 1}`);
        this.events = {};
    }
    handleMonthChange(num) {
        this.firstOfMonthDate = addMonths(this.firstOfMonthDate, num ? 1 : -1);
        this.selectedYear = this.firstOfMonthDate.getFullYear();
        this.retrieveEvents()
            .catch(console.error);
    }
    selectDay(ev) {
        const day = ev.detail;
        if (this.selectedDay && this.selectedDay.formatted === day.formatted) {
            this.selectedDay = null;
        }
        else {
            this.selectedDay = Object.assign({}, day);
        }
    }
    retrieveEvents() {
        const { calendarId, serviceAccountEmail, firstOfMonthDate } = this;
        return getCalendarEvents(calendarId, serviceAccountEmail, firstOfMonthDate, endOfMonth(firstOfMonthDate))
            .then((events) => {
            Object.keys(events).forEach((key) => {
                events[key].forEach((calendarEvent, index) => {
                    calendarEvent.color = this.colors[index % 3];
                });
            });
            this.events = events;
        });
    }
    componentWillLoad() {
        this.retrieveEvents()
            .catch(console.error);
    }
    render() {
        return (h("div", { class: "calendar" },
            h("div", { class: "calendar__header" },
                h("div", { class: "calendar__header-content" },
                    h("h3", { class: "calendar__header-content-headline" }, this.selectedYear),
                    h("div", { class: "calendar__header-content-subline" },
                        h("zijderoute-arrow-left", { class: "calendar__header-content-subline-month-selector clickable", "fill-color": "#ffffff", onClick: () => this.handleMonthChange(0) }),
                        h("h4", null, this.firstOfMonthDate.toLocaleString(navigator.language, this.localeOptions)),
                        h("zijderoute-arrow-right", { class: "calendar__header-content-subline-month-selector clickable", "fill-color": "#ffffff", onClick: () => this.handleMonthChange(1) }))),
                h("div", { class: "calendar__header-icon" })),
            h("hr", { class: "calendar__divider" }),
            h("div", { class: "calendar__body" },
                h("zijderoute-calendar-grid", { date: this.firstOfMonthDate, events: this.events, selected: this.selectedDay })),
            h("div", { class: "calendar__actions" },
                h("zijderoute-calendar-details", { events: this.selectedDay && this.events[this.selectedDay.formatted], selected: this.selectedDay }))));
    }
};
__decorate([
    State()
], ZijderouteCalendar.prototype, "firstOfMonthDate", void 0);
__decorate([
    State()
], ZijderouteCalendar.prototype, "events", void 0);
__decorate([
    State()
], ZijderouteCalendar.prototype, "selectedDay", void 0);
__decorate([
    Listen('selectDay')
], ZijderouteCalendar.prototype, "selectDay", null);
__decorate([
    Prop()
], ZijderouteCalendar.prototype, "serviceAccountEmail", void 0);
__decorate([
    Prop()
], ZijderouteCalendar.prototype, "calendarId", void 0);
ZijderouteCalendar = __decorate([
    Component({
        tag: 'zijderoute-calendar',
        styleUrl: 'zijderoute-calendar.scss',
        shadow: true,
    })
], ZijderouteCalendar);
export { ZijderouteCalendar };
