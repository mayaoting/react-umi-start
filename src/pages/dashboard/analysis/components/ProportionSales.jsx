import React from 'react';
import { Card,Radio} from 'antd';
import {Pie} from './Charts'
import Yuan from '../utils/yuan'

import styles from '../style.less';

const ProportionSales = ({
  loading,
  salesType,
  handleChangeSalesType,
  salesPieData,
}) => (
  <Card
    loading={loading}
    title={"销售额类别占比"}
    border={"false"}
    style={{height:'100%'}}
    extra={
      <div className={styles.salesCardExtra}>
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
              <Radio.Button value="all">
                全部渠道
              </Radio.Button>
              <Radio.Button value="online">
                线上
              </Radio.Button>
              <Radio.Button value="stores">
                门店
              </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{marginTop:8,marginBottom:32,}}>销售额</h4>
      <Pie
        hasLegend
        subTitle={'销售额'}
        total={() => <Yuan>{salesPieData.reduce((pre,now) => now.y + pre,0)}</Yuan>}
        data={salesPieData}
        valueFormat={value => <Yuan>{value}</Yuan>}
        height={248}
        lineWidth={4}
      />
    </div>

  </Card>
)

export default ProportionSales;