// betterSocket with promisify

import util from 'util';

import { socket } from './api';

var betterSocket = function () {
  return {
    on: util.promisify(socket.on),

    off: util.promisify(socket.off),

    emit: util.promisify(socket.emit),
  };
};

const someBetterSocket = betterSocket();

export const getSubjects = () => someBetterSocket.emit('get_channels') as any;
