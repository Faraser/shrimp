import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import Star from 'components/Star';
import UnreadCounter from 'components/UnreadCounter';
import './styles.scss';

export default class ChannelItem extends React.Component {

  static propTypes = {
    item: PropTypes.instanceOf(Map),
    lastMessage: PropTypes.instanceOf(Map),
    isCurrent: PropTypes.bool,
    setCurrentChannel: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    favorite: PropTypes.bool,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      favorite: this.props.favorite || false,
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.isCurrent, this.props.isCurrent) &&
      Immutable.is(nextProps.lastMessage, this.props.lastMessage) &&
      Immutable.is(nextProps.item, this.props.item) &&
      nextState.favorite === this.state.favorite
    );
  }


  setChannel = () => {
    this.props.setCurrentChannel(this.props.item.get('id'));
    const joinedUser = this.props.item.get('userIds').find((userId) => userId === this.props.local.get('userId'));
    if (!joinedUser) {
      this.props.joinToChannel(this.state.id);
    }
  }


  toggleFavorite = e => {
    // TODO: run action which set channel as favorite
    e.stopPropagation();
    this.setState({
      favorite: !this.state.favorite,
    });
  }


  render() {
    const {item, lastMessage} = this.props;
    return (
      <div
        className={cx('channel', {
          'channel_active': this.props.isCurrent,
        })}
        onClick={this.setChannel}
      >
        <Star
          fill={this.state.favorite}
          onClick={this.toggleFavorite}
          className={cx('channel__star', {
            channel__star_filled: this.state.favorite,
          })}
        />
        <div className='channel__name'>{item.get('name')}</div>
        <div className='channel__last-message'>
          {lastMessage ? lastMessage.get('text') : '🙊'}
        </div>
        <UnreadCounter
          className='channel__unread-counter'
          count={item.get('unreadMessagesCount')}
        />
      </div>
    );
  }
}
