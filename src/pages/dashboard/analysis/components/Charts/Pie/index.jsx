import React from 'react';
import { Chart, Axis,Geom} from 'bizcharts'
import { Divider} from 'antd';
import classnames from 'classnames';
import styles from './index.less';


class Pie extends Component {
  state = {
    legendData = [],
    legendBlock = false,
  }
  root = undefined;

  handleRoot = n => {
    this.root = n;
  }
  render() {
    const {
      style,
      height=0,
      forceFit= true,
      animate=true,


    } = this.props 
    const {legendBlock,legendData} = this.state;

    return ( 
      <div ref={this.handleRoot}>
        <div className={styles.chart}>
          <Chart
            scale={scale}
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding}
            animate={animate}
          >

          </Chart>
        </div>
      </div>
     );
  }
}
 
export default Pie;