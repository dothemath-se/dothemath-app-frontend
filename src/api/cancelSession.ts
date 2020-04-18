import { socket } from './index';

export function cancelSession() {
  socket.disconnect();
  socket.connect();
}
