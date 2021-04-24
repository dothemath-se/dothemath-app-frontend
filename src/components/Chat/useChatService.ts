import useAsyncEffect from 'use-async-effect';

import * as api from '../../api';
import { useNamedState } from '../../useNamedState';

export function useChatService(
  name: string,
  subjectId: string,
  threadId: string,
  setThreadId: (threadId: string) => void
): [
  api.OnMessageCallbackData[],
  (text: string, image?: File) => Promise<void>,
  boolean
] {
  const [messages, setMessages] = useNamedState(
    [] as api.OnMessageCallbackData[],
    'messages'
  );

  const [loading, setLoading] = useNamedState(false, 'loading');

  useAsyncEffect(
    async () => {
      try {
        setLoading(true);

        if (!threadId) {
          await establishSession();
        } else {
          try {
            const existingMessages = await reestablishSession();
            setMessages(existingMessages);
          } catch (error) {
            console.warn(error);
            setThreadId('');
            await establishSession();
          }
        }

        api.onMessage((m) => {
          setMessages((y) => [...y, m]);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      async function establishSession() {
        await api.establishSession(subjectId, name);
        console.info('chat session established');
      }

      async function reestablishSession() {
        const result = await api.reestablishSession(subjectId, threadId);
        console.info('chat session reestablished');
        return result.messages;
      }
    },
    () => {
      api.cancelSession();
      console.info('chat session cancelled');
    },
    []
  );

  async function sendMessage(text: string, image?: File) {
    try {
      const newThreadId = await api.sendMessage(text, image);
      console.debug('message sent to threadId', newThreadId);
      setThreadId(newThreadId);

      const localMessages = createLocalMessages();
      setMessages((existingMessages) => [
        ...existingMessages,
        ...localMessages,
      ]);
      console.debug('localMessages added', localMessages);
    } catch (error) {
      console.log(error);
    }

    function createLocalMessages() {
      const localMessages = [] as api.OnMessageCallbackData[];

      if (image) {
        localMessages.push({
          toFrom: 'to',
          text: '',
          name: name,
          image: URL.createObjectURL(image),
        });
      }

      if (text) {
        localMessages.push({
          toFrom: 'to',
          text,
          name: name,
        });
      }

      return localMessages;
    }
  }

  return [messages, sendMessage, loading];
}
