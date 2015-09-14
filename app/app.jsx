import React from 'react';
import MessageList from 'components/message-list';
import MessageBox from 'components/message-box';
import {store} from './store';
import {Map, List} from 'immutable';

// Put some dummy data to store
store.dispatch({
  type: 'ADD_CHANNEL',
  channel: Map({id: 0, name: '0 channel', userIds: List.of(0) }),
});
store.dispatch({
  type: 'ADD_MESSAGE',
  message: Map({id: 0, channelId: 0, senderId: 0, text: 'test message'}),
});


export default class Application extends React.Component {

  render() {
    const msgs = [
      {user: 'dfdf', text: 'HELLO GUYS'},
      {user: 'dfsfdfer', text: 'HELLO GIRLS'},
      {user: 'dfsfdfer', text: 'HEL343LO GIRLS'},
      {user: 'dfsfdfer', text: 'HELL34O GIRLS'},
    ];

    return (
      <div>
        <MessageList messages={msgs}/>
        <MessageBox />
      </div>
    );
  }
}

React.render(<Application />, document.body);
