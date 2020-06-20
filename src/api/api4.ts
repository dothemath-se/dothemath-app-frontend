// betterSocket with Promise

import { socket, Subject } from './api';

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

export const getSubjects = async (): Promise<Subject[]> => {
  await new Promise((r) => setTimeout(r, 2000));
  return someBetterSocket.emit('get_channels') as any;
};
