import React from 'react';
import { Card,Col,Row,DatePicker,Tabs } from 'antd';
import numeral from 'numeral';
import styles from '../style.less';
import { Bar } from './Charts'

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;
const rankListData = [];
for (let i=0;i< 7;i+=1) {
  rankListData.push( {
    title: `奇奇${i}号茶店`,
    total:  Math.random().toFixed(2)*4000 + 100,
  });
}

const SalesCard = ({
  salesData,
  loading,
  isActive,
  selectDate,
  rangePickerValue,
  handleRangePickerChange,
}) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{
      padding:0,
    }}
  >
    <div className={styles.salesCard}>
      <Tabs
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <a className={isActive('today')}
                onClick={() => selectDate('today')}>
                今日
              </a>
              <a className={isActive('week')} 
                onClick={() => selectDate('week')}>
                本周
              </a>
              <a className={isActive('month')} 
                onClick={() => selectDate('month')}>
                本月
              </a>
              <a className={isActive('year')}
                onClick={() => selectDate('year')}>
                全年
              </a>
            </div>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{
                width:256,
              }}
            />
          </div>
        }
        size="large"
        tabBarStyle={{
          marginBottom:24,
        }}
      >
        <TabPane key='sales' tab="销售额">
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  data={salesData}
                  height={295}
                  title={"销售趋势"}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4>Sales Ranking</h4>
                <ul className={styles.rankingList}>
                  {
                    rankListData && rankListData.map((item,i) => (
                      <li key={item.title}>
                        <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                    </li>
                    ))
                  }
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane key="views" tab="访问量">
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  data={salesData}
                  height={295}
                  title={"访问量趋势"}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4>Sales Ranking</h4>
                <ul className={styles.rankingList}>
                  {
                    rankListData && rankListData.map((item,i) => (
                      <li key={item.title}>
                        <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                    </li>
                    ))
                  }
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>

  </Card>
)
export default SalesCard;