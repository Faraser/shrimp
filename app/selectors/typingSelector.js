import {createSelector} from 'reselect';
import {List} from 'immutable';

export const typingUserSelector = createSelector(
  [state => state.local,
  state => state.users,
  state => List(state.typing)],
  (local, users, typing) => {
    return typing
      .filter(item => item.get('channelId') === local.get('currentChannelId') && item.get('senderId') !== local.get('userId'))
      .map(item => users.find(user => user.get('id') === item.get('senderId')))
      .map(user => user.get('name'));
  });

