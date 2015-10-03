import Server from 'socket.io';
import getInitState from './initial-state';
import getMessageModel from './models/message';
import getUserModel from './models/user';
import {SC, CS} from '../constants';
// const debug = require('debug')('shrimp:server');
const Message = getMessageModel();
const User = getUserModel();

export default function startSocketServer(http) {
  const io = new Server(http);

  io.on('connection', socket => {
    getInitState().then(initState => {
      socket.emit(SC.INIT, initState);
    });

    socket.on(CS.SIGN_IN, data => {
      User.find({nick: data.login}, (err, user) => {
        if (user.length > 0) {
          const userData = {
            data: user[0],
            status: {
              type: 'success',
              text: 'Welcome',
            },
          };
          socket.emit(SC.SIGN_IN, { user: userData });
        } else {
          const userData = {
            data: '',
            status: {
              type: 'error',
              text: 'Something wrong',
            },
          };
          socket.emit(SC.SIGN_IN, { user: userData });
        }
      });
    });

    socket.on(CS.ADD_MESSAGE, data => {
      Message.add(data, (err, result) => {
        io.sockets.emit(SC.ADD_MESSAGE, result.toObject());
      });
    });

    socket.on(CS.ADD_CHANNEL, data => {
      io.sockets.emit(SC.ADD_CHANNEL, {id: 0, name: data.text});
    });
  });
}
