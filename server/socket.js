import Server from 'socket.io';
import cookieParser from 'socket.io-cookie';
import getInitState from './initial-state';
import getMessageModel from './models/message';
import getChannelModel from './models/channel';
import getUserModel from './models/user';
import {SC, CS} from '../constants';
import {signInUser, setSessionId, checkSessionId} from './db/db_core.js';
import {generateSessionId} from './lib/core.js';
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

        User.getBySessionId(sessionId)
          .then((user) => {
            console.log(user);
            return Channel.getForUser(user.id);
          })
          .then((channels) => {
            channels.forEach(c => {
              console.log(`joining to ${c.id}`);
              socket.join(c.id);
            });
          });

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

    socket.on(CS.SIGN_IN, data => {
      console.log('signin');
      signInUser(data.login, data.password, (userData) => {
        if (userData.status.type === 'success') {
          const sessionId = generateSessionId();
          setSessionId(userData.userId, sessionId, (userSessionId) => {
            getInitState(userSessionId).then(initState => {
              socket.emit(SC.INIT, initState);
            });
          });
        } else {
          socket.emit(SC.SIGN_IN, {user: userData});
        }
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
