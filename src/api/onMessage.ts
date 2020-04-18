import { OnMessageCallback } from './types';
import { socket_on } from './SocketOnEvent';

export function onMessage(cb: OnMessageCallback) {
  socket_on('message', ({ text, name, image }) => {
    if (image) {
      cb({ toFrom: 'from', name, text: '', image });
    }
    if (text) {
      cb({ toFrom: 'from', name, text });
    }
  });
}
