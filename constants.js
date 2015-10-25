const SC = {
  ADD_MESSAGE: 'SC_ADD_MESSAGE',
  ADD_CHANNEL: 'SC_ADD_CHANNEL',
  INIT: 'SC_INIT',
  SIGN_IN: 'SC_SIGN_IN',
  JOIN_TO_CHANNEL: 'SC_JOIN_TO_CHANNEL',
  START_TYPING: 'SC_START_TYPING',
  END_TYPING: 'SC_END_TYPING',
  HARD_END_TYPING: 'SC_HARD_END_TYPING',
  CHANGE_USER_INFO: 'SC_CHANGE_USER_INFO',
  SET_CHANNEL_HISTORY: 'SC_SET_CHANNEL_HISTORY',
  JOIN_USER: 'SC_JOIN_USER',
  ADD_DIRECT_CHANNEL: 'SC_ADD_DIRECT_CHANNEL',
  EDIT_MESSAGE: 'SC_EDIT_MESSAGE',
  UPDATE_MESSAGE: 'SC_UPDATE_MESSAGE'
};

const CS = {
  ADD_MESSAGE: 'CS_ADD_MESSAGE',
  ADD_CHANNEL: 'CS_ADD_CHANNEL',
  SET_FAVORITE_CHANNEL: 'CS_SET_FAVORITE_CHANNEL',
  SIGN_IN: 'CS_SIGN_IN',
  INIT: 'CS_INIT',
  JOIN_TO_CHANNEL: 'CS_JOIN_TO_CHANNEL',
  START_TYPING: 'CS_START_TYPING',
  END_TYPING: 'CS_END_TYPING',
  CHANGE_USER_INFO: 'CS_CHANGE_USER_INFO',
  MARK_AS_READ: 'CS_MARK_AS_READ',
  ADD_DIRECT_CHANNEL: 'CS_ADD_DIRECT_CHANNEL',
  EDIT_MESSAGE: 'CS_EDIT_MESSAGE',
};

const A = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  REMOVE_CHANNEL: 'REMOVE_CHANNEL',
  SET_LOCAL_STATE: 'SET_LOCAL_STATE',
  SET_CURRENT_CHANNEL: 'SET_CURRENT_CHANNEL',
  ADD_DIRTY_CHANNEL: 'ADD_DIRTY_CHANNEL',
  ADD_DIRTY_DIRECT_CHANNEL: 'ADD_DIRTY_DIRECT_CHANNEL',
  REPLACE_DIRTY_DIRECT_CHANNEL: 'REPLACE_DIRTY_DIRECT_CHANNEL',
  REMOVE_DIRTY_DIRECT_CHANNEL: 'REMOVE_DIRTY_DIRECT_CHANNEL',
  INIT: 'INIT',
  INIT_USER: 'INIT_USER',
  LOG_OUT: 'LOG_OUT',
  JOIN_TO_CHANNEL: 'JOIN_TO_CHANNEL',
  REPLACE_DIRTY_CHANNEL: 'REPLACE_DIRTY_CHANNEL',
  REMOVE_DIRTY_CHANNEL: 'REMOVE_DIRTY_CHANNEL',
  START_TYPING: 'START_TYPING',
  END_TYPING: 'END_TYPING',
  HARD_END_TYPING: 'HARD_END_TYPING',
  CHANGE_USER_INFO: 'CHANGE_USER_INFO',
  LOAD_CHANNEL_HISTORY: 'LOAD_CHANNEL_HISTORY',
  JOIN_USER: 'JOIN_USER',
  CHANGE_MESSAGE_FILTER_VALUE: 'CHANGE_MESSAGE_FILTER_VALUE',
  EDIT_MESSAGE: 'EDIT_MESSAGE',
  ADD_URL: 'ADD_URL',
  UPDATE_URL: 'UPDATE_URL',
  ADD_IMAGE_URL: 'ADD_IMAGE_URL',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
};

const M = {
  MESSAGE_MAX_LENGTH: 220,
  TYPING_DEBOUNCE: 2000,
  API_KEY: '0ccb2018f041465fae7e0d65154b0399',
};

module.exports = {
  SC: SC,
  CS: CS,
  A: A,
  M: M,
};
