import _ from 'lodash';
import io from 'socket.io-client';

import { getConfig } from '../getConfig';
import { readAsArrayBuffer } from './readAsArrayBuffer';

const API_URL = getConfig().VITE_API_URL as string;
console.debug('API_URL', API_URL);

const socket = io(API_URL);

export const getSubjects = (): Promise<Subject[]> =>
  new Promise((resolve) => socket.emit('get_channels', resolve));

export const sendMessage = (text: string, image?: File): Promise<string> =>
  new Promise((resolve) => {
    if (image) {
      readAsArrayBuffer(image).then((arrayBuffer) =>
        socket.emit(
          'send_message',
          {
            text,
            image: arrayBuffer,
          },
          ({ threadId }) => resolve(threadId)
        )
      );
    } else {
      socket.emit('send_message', { text }, ({ threadId }) =>
        resolve(threadId)
      );
    }
  });

export const establishSession = (channelId: string, studentName: string) =>
  new Promise<void>((resolve) => {
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

export const reestablishSession = (
  channelId: string,
  threadId: string
): Promise<ReestablishSessionResult> =>
  new Promise((resolve, reject) => {
    socket.emit(
      'reestablish_session',
      {
        threadId,
        channelId,
      },
      (data: { error: any; name: any; channel: any; messages: any[] }) => {
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
                    text: _.unescape(m.text),
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

export const cancelSession = () => {
  socket.disconnect();
  socket.connect();
};

export const onMessage = (callback: OnMessageCallback) =>
  socket.on('message', ({ text, name, image }) => {
    if (image) {
      callback({ toFrom: 'from', name, text: '', image });
    }
    if (text) {
      callback({ toFrom: 'from', name, text: _.unescape(text) });
    }
  });

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
