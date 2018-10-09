var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Event, Prop } from '@stencil/core';
let ZijderouteCalendarCellComponent = class ZijderouteCalendarCellComponent {
    constructor() {
        this.aspectRatio = { '--aspect-ratio': '1:1' };
    }
    getEventCircles() {
        if (!this.events) {
            return null;
        }
        const numEvents = this.events.length;
        const maxEvents = 2;
        const eventsMarkup = [];
        for (let i = 0; i < numEvents; i += 1) {
            if (i === numEvents && numEvents > maxEvents) {
                // add a `+${numOfExtraEvents}` to the last circle if needed
                eventsMarkup.push(h("div", { class: "daily-events__event daily-events__event--additional", style: { '--event-color': this.events[i].color } },
                    h("span", null,
                        "+",
                        numEvents - maxEvents)));
            }
            else if (i <= numEvents && i <= maxEvents) {
                eventsMarkup.push(h("div", { class: "daily-events__event", style: { '--event-color': this.events[i].color } }));
            }
        }
        return eventsMarkup;
    }
    render() {
        const { day, selectedDay, emitSelectDayEvent, aspectRatio } = this;
        return (h("div", { class: `
          calendar__body-cell
          ${day.isPrevMonth || day.isNextMonth ? 'calendar__body-cell--light' : ''}
          clickable
        `, style: aspectRatio, onClick: () => emitSelectDayEvent.emit(day) },
            h("div", { class: "cell-body" },
                h("div", { class: `
              cell-body__number
              ${day.isToday ? 'cell-body__number--highlighted' : ''}
              ${selectedDay && day.formatted === selectedDay.formatted ? 'cell-body__number--selected' : ''}
            ` },
                    h("span", null, day.number)),
                h("div", { class: "daily-events" }, this.getEventCircles()))));
    }
};
__decorate([
    Prop()
], ZijderouteCalendarCellComponent.prototype, "day", void 0);
__decorate([
    Prop()
], ZijderouteCalendarCellComponent.prototype, "selectedDay", void 0);
__decorate([
    Prop()
], ZijderouteCalendarCellComponent.prototype, "events", void 0);
__decorate([
    Event()
], ZijderouteCalendarCellComponent.prototype, "emitSelectDayEvent", void 0);
ZijderouteCalendarCellComponent = __decorate([
    Component({
        tag: 'zijderoute-calendar-cell',
    })
], ZijderouteCalendarCellComponent);
export { ZijderouteCalendarCellComponent };
