import io from 'socket.io-client';
import store from '../store';
import {Map, fromJS} from 'immutable';
import {addMessage, loadChannelHistory, updateMessage} from '../actions/messages';
import {addChannel, addUserToChannel} from '../actions/channels';
import {setTyping, deleteTyping, hardDeleteTyping} from '../actions/typing';
import {setUserInfo, joinUser} from 'actions/users';
import {init, initUser, logOut} from '../actions/local';
import {SC} from '../../constants';

export function socketClient(type = null, socketData = null) {
  const socket = io();

  if (type === 'SOCKET_INIT') {
    socket.on(SC.ADD_MESSAGE, (data) => {
      store.dispatch(addMessage(fromJS(data)));
    });


    socket.on(SC.UPDATE_MESSAGE, (data) => {
      console.log('UPDATE_MESSAGE', data);
      store.dispatch(updateMessage(fromJS(data)));
    });


    socket.on(SC.ADD_CHANNEL, (data) => {
      store.dispatch(addChannel(Map({id: data.id, name: data.name, joined: false})));
    });


    socket.on(SC.JOIN_USER, (data) => {
      store.dispatch(joinUser(data));
    });


    socket.on(SC.INIT, (data) => {
      store.dispatch(init(data));
    });


    socket.on(SC.SIGN_IN, (data) => {
      store.dispatch(initUser(data));
    });


    socket.on(SC.JOIN_TO_CHANNEL, (data) => {
      store.dispatch(addUserToChannel(data));
    });

    socket.on(SC.START_TYPING, (data) => {
      store.dispatch(setTyping(data));
    });

    socket.on(SC.END_TYPING, (data) => {
      store.dispatch(deleteTyping(data));
    });

    socket.on(SC.HARD_END_TYPING, (data) => {
      store.dispatch(hardDeleteTyping(data));
    });

    socket.on(SC.CHANGE_USER_INFO, (data) => {
      store.dispatch(setUserInfo(data));
    });


    socket.on(SC.SET_CHANNEL_HISTORY, (data) => {
      store.dispatch(loadChannelHistory(data));
    });


    socket.on(SC.ADD_DIRECT_CHANNEL, (data) => {
      store.dispatch(addChannel(Map({
        id: data.id,
        name: data.name,
        users: data.users,
        isDirect: data.isDirect,
      })));
    });


    socket.on('error', () => {
      store.dispatch(logOut());
    });
  } else if (type) {
    socket.emit(type, socketData);
  }
}
