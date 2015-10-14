import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import './styles.scss';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import ThreadsList from 'components/ThreadsList';
import Search from 'components/Search';


export default class Threads extends React.Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    replaceDirtyChannel: PropTypes.func.isRequired,
    setFavoriteChannel: PropTypes.func.isRequired,
    setCurrentChannel: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    markChannelAsRead: PropTypes.func.isRequired,
    newChannel: PropTypes.func.isRequired,
    addDirtyChannel: PropTypes.func.isRequired,
    removeDirtyChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    indirectChannels: PropTypes.instanceOf(List).isRequired,
    directChannels: PropTypes.instanceOf(List).isRequired,
    addDirectChannel: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      currentTabId: 2,
      filterValue: '',
    };
  }


  componentDidMount = () => {
    const threadsWrapper = this.refs.threads.getDOMNode().parentNode;
    threadsWrapper.style.overflowX = 'hidden';
    window.addEventListener('keydown', this.removeDirtyChannel);
  };


  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.directChannels.size > this.props.directChannels.size) {
      const addedChannel = nextProps.directChannels.toArray()[nextProps.directChannels.size - 1];
      const addedChannelName = addedChannel.get('name');
      console.log('added id ', addedChannel.get('id'), ' name ', addedChannelName);
      if (this.state.currentTabId !== 1) return true;

      this.props.setCurrentChannel(addedChannel.get('id'));
    }
    return !(
      Immutable.is(nextProps.indirectChannels, this.props.indirectChannels) &&
      Immutable.is(nextProps.contacts, this.props.contacts) &&
      Immutable.is(nextProps.local, this.props.local) &&
      Immutable.is(nextState.currentTabId, this.state.currentTabId) &&
      Immutable.is(nextState.filterValue, this.state.filterValue)
    );
  };


  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.removeDirtyChannel);
  };


  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  };
  
  getDirectChannelByUserId = (userId) => {
    return this.props.directChannels
      .find(c => c.get('userIds') && c.get('userIds').indexOf(userId) >= 0);
  }


  setCurrentDirectChannel = (userId) => {
    const directChannel = this.getDirectChannelByUserId(userId);
    if (!directChannel) {
      const channelId = [this.props.local.get('userId'), userId].sort().join('');
      this.props.addDirectChannel({
        userIds: [this.props.local.get('userId'), userId],
        name: channelId,
      });
      return;
    }
    this.props.setCurrentChannel(directChannel.get('id'));
  }
  addDirtyChannel = () => {
    const threadsWrapper = this.refs.threads.getDOMNode().parentNode;
    threadsWrapper.scrollTop = 0;
    this.props.addDirtyChannel();
  };

  isCurrentDirectChannel = (userId) => {
    const directChannel = this.getDirectChannelByUserId(userId);
    return directChannel && this.props.local.get('currentChannelId') === directChannel.get('id');
  }

  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  };


  removeDirtyChannel = (e) => {
    if (e.keyCode === 27) {
      this.props.removeDirtyChannel();
    }
  };


  changeFilterValue = (e) => {
    this.setState({
      filterValue: e.target.value,
    });
  };


  render() {
    const {
      indirectChannels,
      channels,
      contacts,
      setCurrentChannel,
      local,
      replaceDirtyChannel,
      newChannel,
      joinToChannel,
      setFavoriteChannel,
      markChannelAsRead,
    } = this.props;

    const tabs = List.of(
      Map({id: 1, name: 'People', sendToServer: false, list: contacts }),
      Map({id: 2, name: 'Channels', sendToServer: false, list: indirectChannels }),
    );

    const currentTabData = tabs.find(tab => tab.get('id') === this.state.currentTabId);

    let filterData = currentTabData.get('list').filter(listItem => {
      return listItem.get('isDirty') || listItem.get('name').indexOf(this.state.filterValue) !== -1;
    });

    if (currentTabData.get('name') === 'Channels') {
      filterData = filterData.sort((a, b) => {
        if (a.get('isFavorite') && !b.get('isFavorite')) {
          return -1;
        }
        if (!a.get('isFavorite') && b.get('isFavorite')) {
          return 1;
        }
        return 0;
      });
    }

    return (
      <div className='threads' ref='threads'>
        <Tabs
          currentTabId={this.state.currentTabId}
          changeTab={this.changeTab}
          className='threads__tabs'
        >
          <Tab id={1}>People</Tab>
          <Tab id={2}>Channels</Tab>
        </Tabs>

        <ThreadsList
          list={filterData}
          local={local}
          channels={channels}
          setCurrentChannel={setCurrentChannel}
          setFavoriteChannel={setFavoriteChannel}
          replaceDirtyChannel={replaceDirtyChannel}
          newChannel={newChannel}
          type={currentTabData.get('name')}
          joinToChannel={joinToChannel}
          setCurrentDirectChannel={this.setCurrentDirectChannel}
          isCurrentDirectChannel={this.isCurrentDirectChannel}
          markChannelAsRead={markChannelAsRead}
        />
        <div className='treads-bottom'>
          <Search
            onChange={this.changeFilterValue}
            className='threads__search'
            inputClassName='threads__search__input'
            iconClassName='threads__search__icon'
          />
          <button
            onClick={this.addDirtyChannel}
            className='add-channel-button'
          ></button>
        </div>
      </div>
    );
  }
}
