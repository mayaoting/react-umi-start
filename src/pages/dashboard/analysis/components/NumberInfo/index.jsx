import React from 'react';
import classnames from 'classnames'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import styles from './index.less';

const NumberInfo = ({
  gap,
  title,
  subtitle,
  total,
  subTotal,
  status,
  suffix,
  ...rest
}) => (
  <div className={styles.numberInfo} {...rest}> 
    {
      title && (
        <div className={styles.numberInfoTitle} 
          title={typeof title === 'string' ? title :''}>
            {title}
        </div>
      )
    }
    {
      subtitle && (
        <div className={styles.numberInfoSubTitle}
          title={typeof subtitle === 'string' ? subtitle : ''}
        >
          {subtitle}
        </div>
      )
    }
    <div className={styles.numberInfoValue}
      style={
        gap ? {marginTop:gap,} :{}
      }
    >
      <span> 
        {total}
        {suffix && <em className={styles.suffix}>{suffix}</em>}
      </span>
      {
        (status || subtitle) && (
          <span className={styles.subTotal}>
            {subTotal}
            {status && status === 'up' ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          </span>
        )
      }
    </div>
  </div>
)

export default NumberInfo;