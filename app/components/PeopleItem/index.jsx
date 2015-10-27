import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import UnreadCounter from 'components/UnreadCounter';
import {Link} from 'react-router';
import './styles.scss';

export default class PeopleItem extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Map),
    lastMessage: PropTypes.instanceOf(Map),
    directChannel: PropTypes.instanceOf(Map),
    isCurrent: PropTypes.bool,
    isOnline: PropTypes.bool,
    currentChannelId: PropTypes.string.isRequired,
    setCurrentDirectChannel: PropTypes.func.isRequired,
    markChannelAsRead: PropTypes.func.isRequired,
    getDirectChannelByUserId: PropTypes.func.isRequired,
    unreadCount: PropTypes.number,
  };


  shouldComponentUpdate(nextProps) {
    return !(
      Immutable.is(nextProps.isOnline, this.props.isOnline) &&
      Immutable.is(nextProps.isCurrent, this.props.isCurrent) &&
      Immutable.is(nextProps.lastMessage, this.props.lastMessage) &&
      Immutable.is(nextProps.item, this.props.item) &&
      Immutable.is(nextProps.currentChannelId, this.props.currentChannelId)
    );
  }


  setChannel = () => {
    this.props.setCurrentDirectChannel(this.props.item.get('id'));
    this.props.markChannelAsRead({ channelId: this.props.currentChannelId, lastSeen: new Date().toUTCString() });
    if (this.props.getDirectChannelByUserId(this.props.item.get('id'))) {
      this.props.markChannelAsRead({ channelId: this.props.getDirectChannelByUserId(this.props.item.get('id')).get('id'), lastSeen: new Date().toUTCString() });
    }
  }

  openUserInfo = () => {
    console.log('open');
  }


  render() {
    const {isCurrent, item, lastMessage, isOnline} = this.props;
    window.item = item;
    // Don't show unread count for current channel
    const unreadCount = this.props.isCurrent || this.props.unreadCount === 0 ? null : this.props.unreadCount;
    return (
      <div
        className={cx('person', {
          'person_active': isCurrent,
          'person_offline': !isOnline,
        })}
        onClick={this.setChannel}
      >
        <div className='person__name'>{item.get('name')}</div>
        <div className='person__last-message'>
          {lastMessage ? lastMessage.get('text') : '🙊'}
        </div>

        <Link to={`/users/${item.get('id')}`}>
          <button onClick={this.openUserInfo}>info</button>
        </Link>
        <UnreadCounter
          className='person__unread-counter'
          count={unreadCount}
        />
      </div>
    );
  }
}
