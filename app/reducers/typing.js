import {A} from '../../constants';
import {Set, Map} from 'immutable';
const initTyping = Set();

export function typing(state = initTyping, action = null) {
  switch (action.type) {
  case A.START_TYPING:
    return state.add(Map(action.payload));
  case A.END_TYPING:
    return state.delete(Map(action.payload));
  case A.HARD_END_TYPING:
    return state.filter(item => item.get('senderId') !== action.payload.senderId.toString());
  default:
    return state;
  }
}
