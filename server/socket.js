import Server from 'socket.io';
import cookieParser from 'socket.io-cookie';
import getInitState from './initial-state';
import getMessageModel from './models/message';
import getChannelModel from './models/channel';
import getUserModel from './models/user';
import {SC, CS} from '../constants';
import {checkSessionId, joinToChannel} from './db/db_core.js';
// const debug = require('debug')('shrimp:server');
const Message = getMessageModel();
const Channel = getChannelModel();
const User = getUserModel();

export default function startSocketServer(http) {
  const io = new Server(http);

  io.use(cookieParser);

  io.use((socket, callback) => {
    if (socket.request.headers.cookie) {
      const sessionId = socket.request.headers.cookie.sessionId;
      checkSessionId(sessionId).then(() => {
        socket.sessionId = sessionId;
        callback();
      }).catch((exception) => {
        callback(new Error(exception));
      });
    }
  });

  io.on('connection', socket => {
    socket.on(CS.INIT, () => {
      getInitState(socket.sessionId).then(initState => {
        socket.emit(SC.INIT, initState);
      });
    });

    User.getBySessionId(socket.sessionId)
      .then((user) => {
        return Channel.getForUser(user.id);
      })
      .then((channels) => {
        channels.forEach(c => {
          socket.join(c.id);
        });
      });

    socket.on(CS.JOIN_TO_CHANNEL, channelId => {
      joinToChannel(socket.sessionId, channelId, (userId) => {
        socket.join(channelId);
        socket.emit(SC.JOIN_TO_CHANNEL, {channelId, userId});
      });
    });

    socket.on(CS.ADD_MESSAGE, data => {
      Message.add(data, (err, result) => {
        io.to(data.channelId).emit(SC.ADD_MESSAGE, result.toObject());
      });
    });

    socket.on(CS.ADD_CHANNEL, data => {
      io.sockets.emit(SC.ADD_CHANNEL, {id: 0, name: data.text});
    });
  });
}
