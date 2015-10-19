import {A, CS} from '../../constants.js';

export function startTyping(data) {
  return {
    type: CS.TYPING,
    payload: data,
    send: true,
  };
}

export function setTyping(data) {
  return {
    type: A.TYPING,
    payload: data,
  };
}
