import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Card,Row,Col, Tooltip,Table } from 'antd';
import { MiniArea } from './Charts';
import numeral from 'numeral';
import NumberInfo from './NumberInfo';
import styles from '../style.less'
import Trend from './Trend';
const columns = [
  {
    title:'等级',
    dataIndex:'index',
    key:'index',
  },
  {
    title:'搜索关键字',
    key:'keyword',
    dataIndex:'keyword',
    render: text => (<a href="/">{text}</a>)
  },
  {
    title:'用户数',
    dataIndex:'count',
    key:'count',
    sorter:(a,b) => a.count - b.count,
    className:styles.alignRight,
  },
  {
    title:'周涨幅',
    dataIndex:'range',
    key:'range',
    sorter:(a,b) => a.range - b.range,
    render:(text,record) => (
      <Trend flag={record.status === 1 ? 'down': 'up'}>
        <span
          style={{marginRight:4}}
        >
          {text}%
        </span>
      </Trend>
    )
  }
];

const TopSearch = ({
  loading,
  visitData2,
  searchData,
}) => (
  <Card 
    loading={loading}
    border={"false"}
    title={"线上热门搜索"}
    style={{height:'100%'}}
  >
    <Row gutter={68} type="flex">
      <Col sm={12} xs={24} style={{marginBottom:24}}>
        <NumberInfo
          subtitle={
            <span>
              搜索用户数
              <Tooltip
                title={'Introduce'}
              >
                <InfoCircleOutlined style={{marginLeft:8}}/>
              </Tooltip> 
            </span>
          }
          gap={8}
          total={numeral(12321).format(0,0)}
          status="up"
          subTotal={17.1}
        />
        <MiniArea  line height={45} data={visitData2}/>
      </Col>
      <Col sm={12} xs={24} style={{marginBottom:24}}>
        <NumberInfo
          subtitle={
            <span>
              人均搜索次数
              <Tooltip
                title={'Introduce'}
              >
                <InfoCircleOutlined style={{marginLeft:8}}/>
              </Tooltip> 
            </span>
          }
          gap={8}
          total={2.7}
          status="down"
          subTotal={26.2}
        />
        <MiniArea  line height={45} data={visitData2}/>
      </Col>
    </Row>
    
    <Table
      rowKey={record => record.index} 
      size='small'
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: {
          marginBottom:0,
        },
        pageSize:5,
      }}
    />
  </Card>
)

export default TopSearch;