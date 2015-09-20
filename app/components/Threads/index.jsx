import React, {PropTypes} from 'react';
import './styles.scss';
import ThreadsHeader from 'components/ThreadsHeader';
import ThreadsList from 'components/ThreadsList';

const peopleTab = { id: 0, name: 'People' };
const channelsTab = { id: 1, name: 'Channels' };

const tabs = [
  peopleTab,
  channelsTab,
];

const activeChannelId = 1;


export default class ThreadsSection extends React.Component {
  static propTypes = {
    channels: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTab: peopleTab.id,

    };
  }


  changeTab = (tab) => {
    this.setState({ currentTab: tab.id });
  };

  render() {
    const {channels, users} = this.props;
    return (
      <div className='threads'>
        <ThreadsHeader tabs={tabs} changeTab={this.changeTab} currentTab={this.state.currentTab} />
        {this.state.currentTab === peopleTab.id
          ? <ThreadsList list={users} activeChannelId={activeChannelId} type={'people'}/>
          : null}
        {this.state.currentTab === channelsTab.id
          ? <ThreadsList list={channels} activeChannelId={activeChannelId} type={'channels'}/>
          : null}
      </div>
    );
  }
}
