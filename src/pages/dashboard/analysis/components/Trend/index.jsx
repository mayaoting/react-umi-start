import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';

const Trend = ({
  colorful = true,
  reverseColor = false,
  flag,
  children,
  className,
  ...rest
}) => {
  const classString = classnames(styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className,
    )
  return (
    <div className={classString} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {
        flag && (
          <span className={styles[flag]}>
            {flag === 'up' ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          </span>
        )
      }
    </div>
  );
}

export default Trend;