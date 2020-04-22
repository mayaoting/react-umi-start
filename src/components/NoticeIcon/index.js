import React from 'react';
import { Badge, Tabs} from 'antd';
import { BellOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import useMergeValue from 'use-merge-value';
import HeaderDropdown from '../HeaderDropDown/index';
import NoticeList from './NoticeList';
import styles from './index.less';

const { TabPane } = Tabs;

const NoticeIcon = props => {
  const getNotificationBox = () => {
    const {
      children,
      onTabChange,
      clearText,
      viewMoreText,
      onItemClick,
      onClear,
      onViewMore,
    } = props;
    if(!children) {
      return null;
    }
    const panes = [];
    /**
     * 每个组件都可以获取到 props.children ,它包含的是父组件开始标签和结束标签之间的内容
     *  React.Children 提供了用于处理this.props.children不透明数据结构的使用方法 
    */ 
    
    React.Children.forEach(children,child => {
      if(!child) {
        return;
      }

      const { list,title,count,tabKey,showClear,showViewMore } =  child.props
      console.log('childProps',child.props);
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const tabTitle = msgCount > 0 ? `${title}(${msgCount})` : title;
      panes.push(
        <TabPane tab={tabTitle} key={tabKey}>
          <NoticeList
            clearText={clearText}
            viewMoreText={viewMoreText}
            data={list}
            onClear={() => onClear && onClear(title,tabKey)}
            onClick={item => onItemClick && onItemClick(item,child.props)}
            onViewMore={event => onViewMore && onViewMore(child.props,event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
            {...child.props}
          />
        </TabPane>
      );
    });
    return (
      <>
        <Tabs className={styles.tabs} onChange={onTabChange}>
          {panes}
        </Tabs>
      </>
    )
  }
  const { className, count } = props;
  const [ visible, setVisible ] = useMergeValue(false,{
    value:props.popupVisible,
    onChange:props.onPopupVisibleChange,
  }) 
  const notificationBox = getNotificationBox();
  const noticeButtonClass = classnames(className,styles.noticeButton);
  const trigger = (
    <span className={classnames(noticeButtonClass, {
      opened: visible,
    })}>
      <Badge
        count={count}
        style={{boxShadow:'none'}}
        className={styles.badge}
      >
        <BellOutlined className={styles.icon}/>
      </Badge>
    </span>
  )
  if (!notificationBox) {
    return trigger;
  }
  return (
    <HeaderDropdown
      overlayClassName={styles.popover}
      placement="bottomRight"
      trigger={['click']}
      overlay={notificationBox}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </HeaderDropdown>
  )
};

NoticeIcon.defaultProps = {
  emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};
NoticeIcon.Tab = NoticeList;
export default NoticeIcon;