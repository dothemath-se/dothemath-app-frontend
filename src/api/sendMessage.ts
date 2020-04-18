import { socket_emit } from './SocketEmitEvent';

export function sendMessage(text: string, image?: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const arrayBuffer = this.result as ArrayBuffer;
        socket_emit(
          'send_message',
          {
            text,
            image: arrayBuffer,
          },
          ({ threadId }) => resolve(threadId)
        );
      };
      fileReader.readAsArrayBuffer(image);
    } else {
      socket_emit('send_message', { text }, ({ threadId }) =>
        resolve(threadId)
      );
    }
  });
}
