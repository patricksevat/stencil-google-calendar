var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Prop } from '@stencil/core';
import { VISIBILITY_TYPES } from '../calendar.types';
let ZijderouteCalendarDetails = class ZijderouteCalendarDetails {
    componentDidLoad() {
        this.container = this.el.querySelector('.calendar-details__container');
    }
    componentDidUpdate() {
        const isExpanded = this.container.classList.contains('calendar-details__container--empty');
        const transitionMemo = this.container.style.transition;
        this.container.style.transition = '';
        requestAnimationFrame(() => {
            const totalHeight = Array.from(this.container.childNodes)
                .reduce((acc, node) => acc + node.scrollHeight, 0);
            const elHeight = isExpanded ? 16 : totalHeight;
            this.container.style.transition = transitionMemo;
            this.container.style.height = `${elHeight}px`;
        });
    }
    render() {
        if (!this.selected || !this.events || !Array.isArray(this.events) || this.events.length === 0) {
            return h("div", { class: "calendar-details__container calendar-details__container--empty" });
        }
        return (h("div", { class: "calendar-details__container" }, this.events.map((event) => {
            const isPublic = event.visibility === VISIBILITY_TYPES.PUBLIC;
            return (h("div", { class: "event-detail__container" },
                h("zijderoute-calendar-icon", { class: "event-detail__icon", "fill-color": event.color, "background-color": "#ffffff" }),
                h("div", { class: "event-detail__body" },
                    h("p", { class: "event-detail__data event-detail__data--title" }, isPublic ? event.summary : 'Private appointment'),
                    h("p", { class: "event-detail__data event-detail__data--location" }, isPublic ? event.location : 'Private location'),
                    h("p", { class: "event-detail__data event-detail__data--time" },
                        event.start.dateTime.substr(11, 5),
                        " - ",
                        event.end.dateTime.substr(11, 5)))));
        })));
    }
};
__decorate([
    Prop()
], ZijderouteCalendarDetails.prototype, "events", void 0);
__decorate([
    Prop()
], ZijderouteCalendarDetails.prototype, "selected", void 0);
__decorate([
    Element()
], ZijderouteCalendarDetails.prototype, "el", void 0);
ZijderouteCalendarDetails = __decorate([
    Component({
        tag: 'zijderoute-calendar-details',
        styleUrl: 'zijderoute-calendar-details.scss',
    })
], ZijderouteCalendarDetails);
export { ZijderouteCalendarDetails };
