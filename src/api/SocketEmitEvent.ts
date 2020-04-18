import { socket } from './index';

type SocketEmitEvent =
  | 'get_channels'
  | 'send_message'
  | 'establish_session'
  | 'reestablish_session';

export function socket_emit(event: SocketEmitEvent, ...args: any[]) {
  socket.emit(event, ...args);
}
