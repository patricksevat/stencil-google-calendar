import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'zijderoute-arrow-left',
  shadow: true,
})
export class ZijderouteArrowLeftComponent {
  @Prop() fillColor: string;

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill={this.fillColor || '#000'} d="M14 7l-5 5 5 5V7z"/>
        <path fill="none" d="M24 0v24H0V0h24z"/>
      </svg>
    );
  }
}
