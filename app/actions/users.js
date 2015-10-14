import {A} from '../../constants';

export function setUserInfo(data) {
  return {
    type: A.CHANGE_USER_INFO,
    payload: data,
  };
}


export function joinUser(data) {
  return {
    type: A.JOIN_USER,
    payload: data,
  };
}
