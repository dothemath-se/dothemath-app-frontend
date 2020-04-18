import { socket_emit } from './SocketEmitEvent';

export function establishSession(channelId: string, studentName: string) {
  return new Promise((resolve, reject) => {
    socket_emit(
      'establish_session',
      {
        studentName,
        channelId,
      },
      () => {
        resolve();
      }
    );
  });
}
