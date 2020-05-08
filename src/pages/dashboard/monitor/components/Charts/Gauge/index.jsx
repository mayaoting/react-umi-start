import React, { Component } from 'react';
import autoHeight from '../../autoHeight';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';

const { Html, Arc, Line } = Guide;


const Gauge = props => {
  const {
    height=1
  } = props;
  Shape.registerShape('point', 'pointer', {
    drawShape(cfg, group) {
      let point = cfg.points[0]; // 获取第一个标记点
      point = this.parsePoint(point);
      const center = this.parsePoint({ // 获取极坐标系下画布中心点
        x: 0,
        y: 0,
      });
      // 绘制指针
      group.addShape('line', {
        attrs: {
          x1: center.x,
          y1: center.y,
          x2: point.x,
          y2: point.y,
          stroke: cfg.color,
          lineWidth: 2,
          lineCap: 'round',
        },
      });
      return group.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 6,
          stroke: cfg.color,
          lineWidth: 3,
          fill: '#fff',
        },
      });
    },
  });
  
  const data = [
    { value: 8.7 },
  ];
  const cols = {
    value: {
      type:'linear',
      min: 0,
      max: 10,
      tickCount: 6,
      nice: true,
    },
  };
  return (
    <Chart height={height} data={data} scale={cols} padding={[-16,0,16,0]} forceFit>
        <Coord type="polar" startAngle={-1.25* Math.PI} endAngle={0.25 * Math.PI} radius={0.75} />
        <Axis name="1" visible={null} />
        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={{
            offset: -12,
            formatter: (val) => {
              switch (val) {
                case '2':
                  return '差';
            
                case '4':
                  return '中';
            
                case '6':
                  return '良';
            
                case '8':
                  return '优';
            
                default:
                  return '';
              }
            },
            textStyle: {
              fontSize: 12,
              fill: 'rgba(0, 0, 0, 0.65)',
              textAlign: 'center',
            },
          }}
        />
        <Guide>
          <Line
            start={[3, 0.905]}
            end={[3.0035, 0.85]}
            lineStyle={{
              stroke: '#19AFFA', // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 2,
            }}
          />
          <Line
            start={[5, 0.905]}
            end={[5, 0.85]}
            lineStyle={{
              stroke: '#19AFFA', // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 3,
            }}
          />
          <Line
            start={[7, 0.905]}
            end={[7, 0.85]}
            lineStyle={{
              stroke: '#19AFFA', // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 3,
            }}
          />
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[10, 0.965]}
            style={{ // 底灰色
              stroke: '#000',
              lineWidth: 10,
            }}
          />
          <Arc
            zIndex={1}
            start={[0, 0.965]}
            end={[data[0].value, 0.965]}
            style={{ // 底灰色
              stroke: '#1890FF',
              lineWidth: 10,
            }}
          />
          <Html
            position={['50%', '95%']}
            html={() => (`
            <div style="width: 300px;text-align: center;font-size: 12px!important;">
              <p style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;">合格率</p>
              <p style="font-size: 20px;color: rgba(0,0,0,0.85);margin: 0;">
                ${data[0].value * 10}%
              </p>
            </div>`)}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color="#1890FF"
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
  )
}

export default autoHeight()(Gauge);
