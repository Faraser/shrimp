import {compose, createStore, applyMiddleware} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import {appReducer} from 'reducers/app_reducer';
import {socketClient} from 'core/socket';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import {A, M} from '../constants';
import cookies from 'browser-cookies';
import {updateUrl} from 'actions/urls';
import {addImageUrl} from 'actions/messages';

const socketMiddleware = () => next => action => {
  if (action.send) {
    socketClient(action.type, action.payload);
  }
  return next(action);
};

const logOutMiddleware = () => next => action => {
  if (action.type === A.LOG_OUT) {
    cookies.erase('sessionId');
    location.reload();
  }
  return next(action);
};

const uploadOembedDataMiddleware = (store) => next => action => {
  if (action.type === A.ADD_URL) {
    fetch(`http://api.embed.ly/1/oembed?url=${action.payload.url}&key=${M.API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.type === 'photo') {
          store.dispatch(addImageUrl({url: data.url, messageId: action.payload.messageId}));
        }
        store.dispatch(updateUrl({url: action.payload.url, data: data}));
      });
  }
  return next(action);
};

const store = compose(
  applyMiddleware(socketMiddleware, logOutMiddleware, uploadOembedDataMiddleware),
  reduxReactRouter({createHistory}),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)(appReducer);

export default store;
