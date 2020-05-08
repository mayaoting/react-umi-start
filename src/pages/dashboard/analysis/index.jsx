import React, { Suspense } from 'react';
import IntroduceRow from './components/IntroduceRow';
import { Col,Dropdown,Menu,Row} from 'antd';
import { connect } from 'umi';
import {getTimeDistance} from './utils/utils'
import styles from './style.less';

const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales  = React.lazy(() => import('./components/ProportionSales'));

class Analysis extends React.Component {
  state = {
    salesType:'all',
    currentTabKey:'',
    rangePickerValue:getTimeDistance('year'),
  };
  componentDidMount() {
    const {dispatch} = this.props;
    if(dispatch) {
      dispatch({
        type:'dashboardAndanalysis/fetch',
      });
    }
  }
  selectDate = type => {
    this.setState({
      rangePickerValue:getTimeDistance(type),
    })
    const { dispatch } = this.props;
    if(dispatch) {
      dispatch({
        type:'dashboardAndanalysis/fetchSalesData'
      })
    }
  }
  handleChangeSalesType = e => {
    this.setState({
      salesType:e.target.value,
    })
  }
  isActive = type => {
    const  { rangePickerValue} = this.state;
    if(!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type)
    if(!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (rangePickerValue[0].isSame(value[0],'day') && 
        rangePickerValue[1].isSame(value[1],'day')) {
      return styles.currentDate;
    }
    return ''
  }
  render() {
    const {
      loading,
      dashboardAndanalysis,
    } = this.props
    const { rangePickerValue,salesType} = this.state;
    const {
      visitData,
      salesData,
      rankListData,
      visitData2,
      searchData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = dashboardAndanalysis;
    let salesPieData; 
    if(salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    
    return (  
      <React.Fragment>
        <Suspense fallback={<h1>Page loading ....</h1>}>
          <IntroduceRow  loading={loading} visitData={visitData}/>
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            isActive={this.isActive}
            salesData={salesData}
            rankListData={rankListData}
            loading={loading}
            selectDate={this.selectDate}
          />
        </Suspense>
        <Row gutter={24} style={{marginTop:'24px'}}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch 
                loading={loading}
                visitData2={visitData2}
                searchData={searchData}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales 
                loading={loading}
                salesType={salesType}
                handleChangeSalesType={this.handleChangeSalesType}
                salesPieData={salesPieData}
              />
            </Suspense>
          </Col>

        </Row>
      </React.Fragment>
    );
  }
}
 
export default connect(({loading,dashboardAndanalysis}) => ({
  dashboardAndanalysis,
  loading:loading.effects['dashboardAndanalysis/fetch'],
}))(Analysis)