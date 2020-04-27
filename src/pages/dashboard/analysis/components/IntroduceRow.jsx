import { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral'
import { ChartCard,Field, MiniArea,MiniBar,MiniProgress } from './Charts'
import Trend from './Trend';
import Yuan from '../utils/yuan'
import styles from '../style.less'
const topColResponsiveProps = {
  xs:24,
  sm:12,
  md:12,
  lg:12,
  xl:6,
  style: {
    marginBottom:24,
  }
}

const IntroduceRow = ({ loading, visitData}) => {
  return(
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          border="false"
          title={"总销售额"}
          action={
            <Tooltip
              title="指标说明"
            >
              <InfoCircleOutlined/>
            </Tooltip>
          }
          loading={loading}
          total={() => <Yuan>126560</Yuan>}
          footer={
            <Field
              label={"日销售额"}
              value={`￥${numeral(12423).format(0,0)}`}
            />
          } 
          contentHeight={46}
        >
          <Trend
            flag='up'
            style={{marginRight:16}}
          >
            周同比
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend
            flag='down'
          >
            日同比
            <span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          border="false"
          loading={loading}
          title={"访问量"}
          action={
            <Tooltip title={"Introduce"}>
              <InfoCircleOutlined/>
            </Tooltip>
          }
          total={numeral(8846).format('0,0')}
          footer={
            <Field
              label={"日访问量"}
              value={numeral(1234).format('0,0')}
            />
          }
          contentHeight={46}
        >
          <MiniArea
            color="#975FE4"
            data={visitData}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          border="false"
          loading={loading}
          title={"支付笔数"}
          action={
            <Tooltip title={"Introduce"}>
              <InfoCircleOutlined/>
            </Tooltip>
          }
          total={numeral(6560).format(0,0)}
          footer={
            <Field
              label={"转换率"}
              value="60%"
            />
          }
          contentHeight={46}
        >
          <MiniBar data={visitData}/>
        </ChartCard>   
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          border="false"
          loading={loading}
          title={"运营活动效果"}
          action={
            <Tooltip title={"Introduce"}
            >
              <InfoCircleOutlined/>
            </Tooltip>
          }
          total="78%"
          footer={
            <div
              style={{whiteSpace:'nowrap',overflow:'hidden',}}
            >
              <Trend
              flag='up'
              style={{marginRight:16,}}
              >
                周同比 <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend
                flag="down"
              >
                日同比 <span className={styles.trendText}>11%</span>
              </Trend>
            </div> 
          }
          contentHeight={46}
        >
          <MiniProgress
            strokeWidth={8}
            target={80}
            color='#13C2C2'
            percent={78}
          />
        </ChartCard>
      </Col>
    </Row>
  )
}

export default IntroduceRow;