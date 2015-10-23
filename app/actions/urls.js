import {A} from '../../constants.js';

export function addUrl(data) {
  return {
    type: A.ADD_URL,
    payload: data,
  };
}

export function updateUrl(data) {
  return {
    type: A.UPDATE_URL,
    payload: data,
  };
}


