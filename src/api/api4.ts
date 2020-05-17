// betterSocket with Promise

import { socket } from './api';

var betterSocket = function () {
  return {
    on: (eventName: string) =>
      new Promise((resolve) => socket.on(eventName, resolve)),

    off: (eventName: string) => new Promise(() => socket.off(eventName)),

    emit: (eventName: string, data?: any) =>
      data
        ? new Promise((resolve) => socket.emit(eventName, data, resolve))
        : new Promise((resolve) => socket.emit(eventName, resolve)),
  };
};

const someBetterSocket = betterSocket();

export const getSubjects = () => someBetterSocket.emit('get_channels') as any;
