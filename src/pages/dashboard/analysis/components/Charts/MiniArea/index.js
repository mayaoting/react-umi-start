import React from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'
import styles from '../index.less'
import autoHeight from '../autoHeight';


const MiniArea = (props) => {
  const {
    height = 1,
    data=[],
    forceFit = true,
    animate = true,
    scale = {
      x:{},
      y:{},
    },
    xAxis,
    yAxis,
    line,
    borderColor = "#1089ff",
    borderWidth=2,
    color='rgba(24,144,255,0.2)'
  } = props;
  const chartHeight = height + 54;
  const padding = [36,5,30,5];
  const tooltip = [
    'x*y',
    (x,y) => ({
      name:x,
      value:y,
    }),
  ];
  const scaleProps = {
    x: {
      type:'cat',
      range: [0,1],
      ...scale.x,
    },
    y: {
      min:0,
      ...scale.y,
    }
  };
  return (
    <div
      className={styles.miniChart}
      style={{height}}
    >
      <div className={styles.chartContent}>
        {
          height > 0 && (
            <Chart 
              abimate={animate}
              scale={scaleProps}
              height={chartHeight}
              forceFit={forceFit}
              data={data}
              padding={padding}
            >
              <Axis
                key="axis-x"
                name="x"
                label={null}
                line={null}
                tickLine={null}
                grid={null}
                {...xAxis}
              />
              <Axis
                key="axis-y"
                name="y"
                label={null}
                line={null}
                tickLine={null}
                grid={null}
                {...yAxis}
              />
              <Tooltip showTitle={false} crosshair={false} />
              <Geom
                type="area"
                position="x*y"
                color={color}
                tooltip={tooltip}
                shape="smooth"
                style={{fillOpacity:1,}}
              />
              {
                line ? (
                  <Geom 
                    style='line'
                    position="x*y"
                    shape="smooth"
                    color={borderColor}
                    size={borderWidth}
                    tooltip={false}
                  />
                ) : (
                  <span style={{display:'none'}}></span>
                )
              }
            </Chart>
          )
        }
      </div>
    </div>
  )
}

export default autoHeight() (MiniArea)