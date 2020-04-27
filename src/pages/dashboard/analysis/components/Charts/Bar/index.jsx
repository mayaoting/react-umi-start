import React from 'react';
import Debounce from 'lodash.debounce';
import styles from '../index.less';
import { Chart,Geom,Tooltip,Axis} from 'bizcharts';

import autoHeight from '../autoHeight'

class Bar extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
  }
  state = {
    autoHideXLabels: false,
  };
  root = undefined;
  node = undefined;

  resize = Debounce(() => {
    if (!this.node || !this.node.parentNode) {
      return;
    }

    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;

    if (!autoLabel) {
      return;
    }

    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }, 500);

  componentDidMount() {
    window.addEventListener('resize', this.resize, {
      passive: true,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  handleRef = n => {
    this.node = n;
  }
  handleRoot = n => {
    this.root = n;
  }
  render() { 
    const { 
      height=1,
      title,
      forceFit = true,
      data=[],
      color='rgba(24,144,255,0.85)',
      padding,
    } = this.props;
    const autoHideXLabels = this.state;
    console.log('autoHideXLabels',autoHideXLabels);
    const scale = {
      x:{
        type:'cat',
      },
      y:{
        min:0,
      },
    };
    const tooltip = [
      'x*y',
      (x,y) => ({
        name:x,
        value:y,
      }),
    ];

    return (  
      <div className={styles.chart}
        style={{height}}
        ref = {this.handleRoot}
      >
        <div ref = {this.handleRef}>
          {
            title && (
              <h4
                style ={{
                  marginBottom:20,
                }}
              >
                {title}
              </h4>
            )
          }
          <Chart 
            scale={scale}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={data}
            padding={padding || "auto"}
          >
            <Axis
              name="x"
              title={false} 
              label={{rotate:30}}
              tickLine={autoHideXLabels ? undefined :{}}
            />

            <Axis
              name="y"
              min={0}
            />
            <Tooltip showTitle={false} crosshairs={false}/>
            <Geom 
              tooltip={tooltip}
              type="interval"
              color={color}
              position="x*y"
            />
          </Chart>
        </div>
      </div>
    );
  }
}
 
export default autoHeight()(Bar);