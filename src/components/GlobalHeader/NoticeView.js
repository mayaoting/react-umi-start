import React, { Component } from 'react';
import {connect} from 'umi';
import {Tag,message} from 'antd';
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import NoticeIcon from '../NoticeIcon';
import styles from './index.less'

class NoticeView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type:'global/fetchNotices',
      });
    }
  }

  changeReadState = (clickedItem) => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };
  getNoticeData = () => {
    const { notices = [] } = this.props;

    if(!notices || notices.length ===0 ) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = {...notice};
      if(newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if(newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if(newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag
            color={color}
            style={{marginRight:0}}
          >
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    console.log(newNotices);
    return groupBy(newNotices, 'type');
  };
  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.keys(noticeData).forEach(key => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };
  render() { 
    const {currentUser, fetchingNotices, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    return ( 
        <NoticeIcon
          className={styles.action}
          count={currentUser && currentUser.unreadCount}
          onItemClick={item => {
            this.changeReadState(item);
          }}
          loading={fetchingNotices}
          clearText="清空"
          viewMoreText="查看更多"
          onClear={this.handleNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          onViewMore={() => message.info('Click on view more')}
          clearClose
        >
          <NoticeIcon.Tab
            tabKey="notification"
            title="通知"
            emptyText="你已查看所有通知"
            showViewMore
            list={noticeData.notification}
            count={unreadMsg.notification}
          />
          <NoticeIcon.Tab
            tabKey="message"
            title="消息"
            emptyText="你已读完所有消息"
            showViewMore
            list={noticeData.message}
            count={unreadMsg.message}
          />
          <NoticeIcon.Tab
            tabKey="event"
            title="待办"
            emptyText="你已完成所有待办"
            showViewMore
            list={noticeData.event}
            count={unreadMsg.event}
          />
        </NoticeIcon>
     );
  }
}
 

/**
 * loading 是 plugin-dva插件中的 dva-loading, 直接connect loading 字段使用即可
 */
export default connect(({user,global,loading}) => ({
  currentUser:user.currentUser,
  notices: global.notices,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  fetchingMoreNotices:loading.effects['global/fetchMoreNotices'],
}))(NoticeView);