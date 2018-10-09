var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from '@stencil/core';
let ZijderouteCalendarIconComponent = class ZijderouteCalendarIconComponent {
    render() {
        return (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            h("path", { fill: this.fillColor || '#000000', 
                // tslint:disable-next-line
                d: "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" }),
            h("path", { fill: "none", d: "M0 0h24v24H0z" })));
    }
};
__decorate([
    Prop()
], ZijderouteCalendarIconComponent.prototype, "fillColor", void 0);
__decorate([
    Prop()
], ZijderouteCalendarIconComponent.prototype, "backgroundColor", void 0);
ZijderouteCalendarIconComponent = __decorate([
    Component({
        tag: 'zijderoute-calendar-icon',
        shadow: true,
    })
], ZijderouteCalendarIconComponent);
export { ZijderouteCalendarIconComponent };
