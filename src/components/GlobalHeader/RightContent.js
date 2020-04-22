import React from 'react';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less'
import NoticeView from './NoticeView'

const GlobalHeader = props => {
  const {them,layout} = props;
  return (
    <div className={styles.right}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue=""
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}  
        onSearch={(value) => {
          console.log('input', value);
        }}
      />
      <NoticeView/>
    </div>
  )
}

export default GlobalHeader
