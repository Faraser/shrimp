import {A, CS} from '../../constants.js';

export function sendStartTyping(data) {
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

export function deleteTyping(data) {
  return {
    type: A.END_TYPING,
    payload: data,
  };
}

export function sendEndTyping(data) {
  return {
    type: CS.END_TYPING,
    payload: data,
    send: true,
  };
}
