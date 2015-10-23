import {A} from '../../constants';
import {List, Map} from 'immutable';
const initCacheUrls = List();


export function urls(state = initCacheUrls, action = null) {
  switch (action.type) {
  case A.ADD_URL:
    const foundedUrl = state.find(url => url.get('url') === action.payload.url);
    if (foundedUrl) {
      return state;
    }
    return state.push(Map({url: action.payload.url, data: null}));
  case A.UPDATE_URL:
    const foundIndex = state.findIndex(url => url.get('url') === action.payload.url);
    return state.set(foundIndex, Map({url: action.payload.url, data: action.payload.data}));
  default:
    return state;
  }
}
