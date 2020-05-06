import io from 'socket.io-client';

const socket = io('https://api.dothemath.app');

export const getSubjects = (cb) => {
  socket.emit('get_channels', cb);
};

export const sendMessage = (text: string, image?: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        socket.emit(
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
      socket.emit('send_message', { text }, ({ threadId }) =>
        resolve(threadId)
      );
    }
  });
};

export const establishSession = (channelId: string, studentName: string) => {
  return new Promise((resolve, reject) => {
    socket.emit(
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
};

export const reestablishSession = (
  channelId: string,
  threadId: string
): Promise<ReestablishSessionResult> => {
  return new Promise((resolve, reject) => {
    socket.emit(
      'reestablish_session',
      {
        threadId,
        channelId,
      },
      (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve({
            name: data.name,
            subject: data.channel,
            messages: data.messages
              .map((m) => {
                const msgs: OnMessageCallbackData[] = [];
                if (m.image) {
                  msgs.push({
                    text: '',
                    name: m.name,
                    image: m.image,
                    toFrom: m.isUser ? 'to' : 'from',
                  });
                }
                if (m.text) {
                  msgs.push({
                    text: m.text,
                    name: m.name,
                    toFrom: m.isUser ? 'to' : 'from',
                  });
                }
                return msgs;
              })
              .flat(),
          });
        }
      }
    );
  });
};

export const cancelSession = () => {
  socket.disconnect();
  socket.connect();
};

export const onMessage = (cb: OnMessageCallback) => {
  socket.on('message', ({ text, name, image }) => {
    if (image) {
      cb({ toFrom: 'from', name, text: '', image });
    }
    if (text) {
      cb({ toFrom: 'from', name, text });
    }
  });
};

type OnMessageCallback = (arg0: OnMessageCallbackData) => void;

export type OnMessageCallbackData = {
  toFrom: 'to' | 'from';
  text: string;
  name: string;
  image?: string;
};

export interface Subject {
  id: string;
  name: string;
}

interface ReestablishSessionResult {
  name: string;
  subject: {
    id: string;
    name: string;
  };
  messages: OnMessageCallbackData[];
}
