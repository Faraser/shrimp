import {A} from '../../constants';
import {Set, Map} from 'immutable';

const initTyping = Set();

export function typing(state = initTyping, action = null) {
  switch (action.type) {
  case A.TYPING:
    console.log('typing_reducer', state.add(Map(action.payload)).toJS());
    return state.add(Map(action.payload));
  default:
    return state;
  }
}
