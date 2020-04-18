import { OnMessageCallbackData, ReestablishSessionResult } from './types';
import { socket_emit } from './SocketEmitEvent';

export function reestablishSession(
  channelId: string,
  threadId: string
): Promise<ReestablishSessionResult> {
  return new Promise((resolve, reject) => {
    socket_emit(
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
}
