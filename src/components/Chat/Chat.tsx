import React from 'react';
import { ConversationContainer } from './Chat.ConversationContainer';
import { InputContainer } from './Chat.InputContainer';
import * as api from '../../api';
import useAsyncEffect from 'use-async-effect';
import { LoadingIndicator } from '../LoadingIndicator';
import { useNamedState } from '../../useNamedState';

interface ChatProps {
  name: string;
  subject: {
    id: string;
    name: string;
  };
  threadId: string;
  setThreadId: (threadId: string) => void;
  onNewQuestionClick: () => void;
}

export const Chat = (props: ChatProps) => {
  const [loading, setLoading] = useNamedState(false, 'loading');
  const [messages, setMessages] = useNamedState(
    [] as api.OnMessageCallbackData[],
    'messages'
  );

  useAsyncEffect(async () => {
    try {
      setLoading(true);

      if (props.threadId) {
        const result = await api.reestablishSession(
          props.subject.id,
          props.threadId
        );
        await wait(1000);
        console.info('session reestablished!');
        setMessages(result.messages);
        // todo: add fallback if nonexistent session on server
      } else {
        await api.establishSession(props.subject.id, props.name);
        await wait(1000);
        console.info('session established!');
      }

      api.onMessage((m) => {
        setMessages((y) => [...y, m]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSendMessage = async (text: string, image?: File) => {
    try {
      console.log('onSendMessage');
      const newThreadId = await api.sendMessage(text, image);
      console.log('threadId', newThreadId);

      const isFirstMessage = messages.length === 0;
      console.log('isFirstMessage', isFirstMessage);

      if (isFirstMessage) {
        props.setThreadId(newThreadId);
      }

      const localMessages: api.OnMessageCallbackData[] = [];

      if (image) {
        localMessages.push({
          toFrom: 'to',
          text: '',
          name: props.name,
          image: URL.createObjectURL(image),
        });
      }

      if (text) {
        localMessages.push({
          toFrom: 'to',
          text,
          name: props.name,
        });
      }

      setMessages((messages) => [...messages, ...localMessages]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <div id="window-wrapper">
        <div id="title-container">
          <h2 id="subject-title">{props.subject?.name}</h2>
          <button
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              const confirmed = confirm(
                'Om du ställer en ny fråga kommer den här att försvinna. Är du säker?'
              );
              if (!confirmed) return;

              props.onNewQuestionClick();
            }}
            id="new-question-button"
          >
            Ställ en ny fråga
          </button>
        </div>
        <div id="content-wrapper">
          <div id="chat-wrapper">
            <ConversationContainer messages={messages} />
            <InputContainer onSend={onSendMessage} />
          </div>
        </div>
        <img
          id="logo"
          src="img/logo_white.svg"
          alt="Site Logo"
          draggable="false"
        />
      </div>{' '}
    </>
  );
};

function wait<T>(ms: number, value?: T) {
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
}
