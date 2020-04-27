import React, { Suspense } from 'react';
import IntroduceRow from './components/IntroduceRow';
import { connect } from 'umi';
import {getTimeDistance} from './utils/utils'
import styles from './style.less';

const SalesCard = React.lazy(() => import('./components/SalesCard'));

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
    const { rangePickerValue} = this.state;
    const {visitData,salesData,rankListData} = dashboardAndanalysis;
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
      </React.Fragment>
    );
  }
}
 
export default connect(({loading,dashboardAndanalysis}) => ({
  dashboardAndanalysis,
  loading:loading.effects['dashboardAndanalysis/fetch'],
}))(Analysis)