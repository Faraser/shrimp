import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import Star from 'components/Star';
import UnreadCounter from 'components/UnreadCounter';
import './styles.scss';

export default class ChannelItem extends React.Component {

  static propTypes = {
    item: PropTypes.instanceOf(Map),
    isCurrent: PropTypes.bool,
    setCurrentChannel: PropTypes.func.isRequired,
    favorite: PropTypes.bool,
  }


  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.get('id'),
      favorite: this.props.favorite || false,
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.isCurrent, this.props.isCurrent) &&
      Immutable.is(nextProps.item, this.props.item) &&
      nextState.favorite === this.state.favorite
    );
  }


  setChannel = () => {
    this.props.setCurrentChannel(this.state.id);
  }


  toggleFavorite = e => {
    // TODO: run action which set channel as favorite
    e.stopPropagation();
    this.setState({
      favorite: !this.state.favorite,
    });
  }


  render() {
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
        <div className='channel__name'>{this.props.item.get('name')}</div>
        <div className='channel__last-message'>
          Commodi sed consequatur et deserunt molestias. Velit cupiditate laudantium
          exercitationem error et at. Doloribus voluptatem sint libero enim at et.
          </div>
        <UnreadCounter
          className='channel__unread-counter'
          count={this.props.item.get('unreadMessagesCount')}
        />
      </div>
    );
  }
}
