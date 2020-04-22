import React from 'react';
import { Dropdown } from 'antd'
import classNames from 'classnames';
import styles from './index'

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} className="xialakuang" />
);

export default HeaderDropdown;
