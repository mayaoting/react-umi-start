import React, { Component } from 'react';
import {yuan} from '../components/Charts'

class Yuan extends Component {
  main = null;
  componentDidMount() {
    this.renderToHtml();
  }

  componentDidUpdate() {
    this.renderToHtml();
  }
  renderToHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = yuan(children);
    }
  }
  render() { 
    return ( 
      <span
        ref={ref => {
          this.main = ref;
        }}
      />
     );
  }
}
 
export default Yuan;