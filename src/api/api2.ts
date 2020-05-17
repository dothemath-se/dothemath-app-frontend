// betterSocket with q

import q from 'q';

import { socket, Subject } from './api';

var betterSocket = function () {
  return {
    on: (eventName: string) => {
      var defer = q.defer();
      socket.on(eventName, defer.resolve);
      return defer.promise;
    },

    off: (eventName: string) => socket.off(eventName),

    emit: (eventName: string, data?: any) => {
      var defer = q.defer();
      if (data) socket.emit(eventName, data, defer.resolve);
      else socket.emit(eventName, defer.resolve);
      return defer.promise;
    },
  };
};

const someBetterSocket = betterSocket();

export const getSubjects = (): q.Promise<Subject[]> =>
  someBetterSocket.emit('get_channels') as any;
