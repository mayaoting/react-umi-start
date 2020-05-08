import React, { Component } from 'react';
import { Chart,Geom,Tooltip,Coord} from 'bizcharts'
import { Divider} from 'antd';
import Debounce from 'lodash.debounce';
import classnames from 'classnames';
import autoHeight from '../../autoHeight';
import { DataView } from '@antv/data-set'
import styles from './index.less';


class Pie extends Component {
  state = {
    legendData:[],
    legendBlock:false,
  }
  root = undefined;
  chart = undefined;
  requestRef = undefined;
  resize = Debounce(()=> {
    const { hasLegend } = this.props;
    const {legendBlock } = this.state;
    if (!hasLegend || !this.root) {
      window.removeEventListener('resize',this.resize);
    }
    if(this.root && this.root.parentNode && this.root.parentNode.clientWidth < 380) {
      if (!legendBlock) {
        this.setState({
          legendBlock: true,
        });
      } 
    } else if (legendBlock) {
      this.setState({
        legendBlock: false,
      })
    }
  },400);
  componentDidMount() {
    window.addEventListener(
      'resize',
      () => {
        this.requestRef = requestAnimationFrame(() => this.resize());
      },
      {
        passive:true,
      },
    );
  }
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.getLegendData();
    }
  }
  getG2Instance = chart => {
    this.chart = chart;
    requestAnimationFrame(() => {
      this.getLegendData();
      this.resize();
    })
  }
  getLegendData = () => {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0];
    if (!geom) return;
    const items = geom.get('dataArray') || [];
    const legendData = items.map(item => {
      const origin = item[0]._origin;
      origin.color = item[0].color;
      origin.checked = true;
      return origin;
    });
    this.setState({
      legendData,
    })
  }
  
  handleRoot = n => {
    this.root = n;
  }
  handleLegendClick = (item,i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    const { legendData } = this.state;
    legendData[i] = newItem;
    const filteredLegendData = legendData.filter(l => l.checked).map(l => l.x);
    if (this.chart) {
      this.chart.filter('x',val => filteredLegendData.indexOf(`${val}`) > -1);
    }
    this.setState({
      legendData,
    });
  };
  
  render() {
    const {
      valueFormat,
      style,
      height=0,
      classNames,
      forceFit= true,
      animate=true,
      inner = 0.75,
      lineWidth = 1,
      percent,
      color,
      colors,
      subTitle,
      total,
      hasLegend,

    } = this.props 
    const {legendBlock,legendData} = this.state;
    const pieClassName = classnames(styles.pie,classNames, {
      [styles.hasLegend]: !! hasLegend,
      [styles.legendBlock]: legendBlock,
    });
    const scale = {
      x: {
        type:'cat',
        range:[0,1],
      },
      y: {
        min:0,
      },
    };
    let formatColor;
    const {
      data:propsData,
      selected: propsSelected = true,
      tooltip: propsTooltip = true,
    } = this.props;
    let data = propsData || [];
    let selected =  propsSelected;
    let tooltip = propsTooltip;
    const defaultColors = colors;
    data = data || [];
    selected = selected || true;
    tooltip = tooltip || true;
    if (percent || percent === 0) {
      selected = false;
      tooltip = false;
      formatColor = value => {
        if (value === '占比') {
          return color || 'rgba(24,144,255,0.85)';
        }
        return '#F0F2F5';
      };
      data = [
        {
          x: '占比',
          y:parseFloat(`${percent}`),
        },
        {
          x: '反比',
          y: 100 - parseFloat(`${percent}`),
        },
      ];
    }
    const tooltipFormat = [
      'x*percent',
      (x,p) => ({
        name:x,
        value:`${(p * 100).toFixed(2)}%`
      }),
    ];
    const padding = [12,0,12,0];
    const dv  =new DataView();
    dv.source(data).transform({
      type:'percent',
      field:'y',
      dimension:'x',
      as:'percent',
    })
    return ( 
      <div ref={this.handleRoot} className={pieClassName} style={style}>
        <div className={styles.chart}>
          <Chart
            scale={scale}
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding}
            animate={animate}
            onGetG2Instance={this.getG2Instance}
          >
            {!!toolbar && <Tooltip showTitle={false} />}
            <Coord type="theta" innerRadius={inner}/>
            <Geom 
              style={{lineWidth,stroke:'#fff'}}
              tooltip={tooltip ? tooltipFormat : undefined}
              type='intervalStack'
              position='percent'
              color={['x',percent || percent === 0 ? formatColor : defaultColors]}
              select={selected}
            />
          </Chart>
          {
            (subTitle || total) && (
              <div className={styles.total}>
                {subTitle && <h4 className='pie-sub-title'>{subTitle}</h4> }
                {total && (
                  <div className="pie-stat">
                    {
                      typeof total === 'function' ? total() : total
                    }
                  </div>
                )}
              </div>
            )
          }
        </div>
        {
          hasLegend && (
            <ul className={styles.legend}>
              {
                legendData.map((item,i) => (
                  <li key={item.x} 
                    onClick={() => this.handleLegendClick(item,i)}
                  >
                    <span 
                      className={styles.dot}
                      style={{
                        backgroundColor:!item.checked ? '#aaa' : item.color,
                      }}
                    />
                    <span className={styles.legendTitle}>{item.x}</span>
                    <Divider type='vertical'/>
                    <span className={styles.percent}>
                      {`${(Number.isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                    </span>
                    <span className={styles.value}>{valueFormat ? valueFormat(item.y) : item.y}</span>
                  </li>
                ))
              }

            </ul>
          )
        }
      </div>
     );
  }
}
 
export default autoHeight()(Pie);