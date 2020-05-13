import React, { Component } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { connect } from 'umi';
import numeral from 'numeral';
import styles from './style.less';
import { Map, Gauge, Pie, TagCloud, WaterWave } from './components/Charts';
import ActiveChart from './components/ActiveChart';

const { Countdown } = Statistic;
class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndmonitor/fetchTags',
    });
  }
  render() {
    const { dashboardAndmonitor, loading } = this.props;
    const { tags } = dashboardAndmonitor;
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
    return (
      <React.Fragment>
        <Row gutter={24}>
          <Col
            xl={18}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ marginBottom: 24 }}
          >
            <Card title={'活动实时交易情况'}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="今日交易总额"
                    suffix="元"
                    value={numeral(123456789).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="销售目标完成率" value="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Countdown
                    title="活动剩余时间"
                    value={deadline}
                    format="HH:mm:ss:SSS"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="每秒交易总额"
                    suffix="元"
                    value={numeral(123).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Map />
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card title={'活动情况预测'} style={{ marginBottom: 24 }}>
              <ActiveChart />
            </Card>
            <Card title={'考核效率'} style={{ marginBottom: 24 }}>
              <Gauge height={180} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24} style={{ marginTop: 24 }}>
            <Card title={'各品类占比'} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={80}
                    title={'Vue'}
                    total="80%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={50}
                    title={'React'}
                    total="50%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={20}
                    title={'Angular'}
                    total="20%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginTop: 24 }}>
            <Card
              title={'热门搜索'}
              loading={loading}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={tags || []} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginTop: 24 }}>
            <Card
              title={'资源剩余'}
              loading={loading}
              bodyStyle={{ overflow: 'hidden', textAlign: 'center' }}
            >
              <WaterWave height={161} title={'Fund Surplus'} percent={34} />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(({ dashboardAndmonitor, loading }) => ({
  dashboardAndmonitor,
  loading: loading.models.dashboardAndmonitor,
}))(Monitor);
