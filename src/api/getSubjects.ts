import { socket_emit } from './SocketEmitEvent';

export function getSubjects(cb) {
  socket_emit('get_channels', cb);
}
