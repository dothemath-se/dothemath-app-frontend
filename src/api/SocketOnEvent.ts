import { socket } from './index';

type SocketOnEvent = 'message';

export function socket_on(event: SocketOnEvent, fn: Function) {
  socket.on(event, fn);
}
