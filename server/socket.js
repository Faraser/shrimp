import Server from 'socket.io';
// const debug = require('debug')('shrimp:server');


export default function startSocketServer(store) {
  const io = new Server().attach(8090);

  if (store) {
    store.subscribe(
      () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
      socket.emit('state', store.getState().toJS());
      socket.on('action', store.dispatch.bind(store));
    });
  }
}
