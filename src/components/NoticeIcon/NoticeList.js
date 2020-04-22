import React from 'react';
import { List, Avatar } from 'antd';
import classnames from 'classnames';
import styles from './NoticeList.less';

const NoticeList = ({
  data = [],
  emptyText,
  onClick,
  onClear,
  clearText,
  title,
  onViewMore,
  viewMoreText,
  showClear = true,
  showViewMore = false,
}) => {
  if(!data || data.length === 0) {
    return (
      <div className={styles.notFound}>
        <img 
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg" 
          alt="not found"/>
          <div>
            {emptyText}
          </div>
      </div>
    );
  }
  return (
    <div>
      <List
        className={styles.list}
        dataSource={data}
        renderItem={(item,i) => {
          const itemCls = classnames(styles.item,{
            [styles.read]:item.read,
          });
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar}/>
            ) : (
              <span className={styles.iconElement}>{item.avatar}</span>
            )
          ) : null;
          return (
            <List.Item
              className={itemCls}
              key={item.key || i}
              onClick={() => onClick && onClick(item)}
            >
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={
                  <div className={styles.title}>
                    {item.title}
                    <div className={styles.extra}>
                      {item.extra}
                    </div>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.description}>{item.description}</div>
                    <div  className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          ) 
        }}
      />
      <div className={styles.bottomBar}>
        {
          showClear ? (
            <div onClick={onClear}>
              {clearText}{title}
            </div>
          ) : null
        }
        {
          showViewMore ? (
            <div onClick={ e => {
              if(onViewMore) {
                onViewMore(e);
              }
            }}>
              {viewMoreText}
            </div>
          ) : null
        }
      </div>
    </div>  
  )
};

export default NoticeList;