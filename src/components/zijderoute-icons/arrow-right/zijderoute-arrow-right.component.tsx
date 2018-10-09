import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'zijderoute-arrow-right',
  shadow: true
})
export class ZijderouteArrowRightComponent {
  @Prop() fillColor: string;

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill={this.fillColor || '#000'} d="M10 17l5-5-5-5v10z"/>
        <path fill="none" d="M0 24V0h24v24H0z"/>
      </svg>
    );
  }
}
