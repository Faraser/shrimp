import io from 'socket.io-client';
import store from '../store';
import {Map} from 'immutable';
import {addChannel} from '../actions/channels';
import {addMessage} from '../actions/messages';
import {init} from '../actions/local';

export const socket = io();

export function startSocketClient() {
  socket.on('ADD_MESSAGE', (data) => {
    store.dispatch(addMessage(Map(data)));
  });

  socket.on('ADD_CHANNEL', (data) => {
    store.dispatch(addChannel(Map({id: 1, name: data.name})));
  });

  socket.on('INIT', (data) => {
    store.dispatch(init(data));
  });
}
