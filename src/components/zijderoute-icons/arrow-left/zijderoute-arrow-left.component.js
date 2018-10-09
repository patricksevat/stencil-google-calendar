var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from '@stencil/core';
let ZijderouteArrowLeftComponent = class ZijderouteArrowLeftComponent {
    render() {
        return (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            h("path", { fill: this.fillColor || '#000', d: "M14 7l-5 5 5 5V7z" }),
            h("path", { fill: "none", d: "M24 0v24H0V0h24z" })));
    }
};
__decorate([
    Prop()
], ZijderouteArrowLeftComponent.prototype, "fillColor", void 0);
ZijderouteArrowLeftComponent = __decorate([
    Component({
        tag: 'zijderoute-arrow-left',
        shadow: true,
    })
], ZijderouteArrowLeftComponent);
export { ZijderouteArrowLeftComponent };
