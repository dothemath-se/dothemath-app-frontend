import React from 'react';
import { ConversationContainer } from './Chat.ConversationContainer';
import { InputContainer } from './Chat.InputContainer';
import * as api from '../../api';
import useAsyncEffect from 'use-async-effect';
import { LoadingIndicator } from '../LoadingIndicator';
import { useNamedState } from '../../useNamedState';
import { wait } from '../../wait';

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

  useAsyncEffect(
    async () => {
      try {
        setLoading(true);

        if (!props.threadId) {
          await establishSession();
        } else {
          try {
            await reestablishSession();
          } catch (error) {
            console.warn(error);
            props.setThreadId('');
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
        await api.establishSession(props.subject.id, props.name);
        await wait(1000);
        console.info('chat session established');
      }

      async function reestablishSession() {
        const result = await api.reestablishSession(
          props.subject.id,
          props.threadId
        );
        await wait(1000);
        console.info('chat session reestablished');
        setMessages(result.messages);
      }
    },
    () => {
      api.cancelSession();
      console.info('chat session cancelled');
    },
    []
  );

  async function onSendMessage(text: string, image?: File) {
    try {
      const threadId = await api.sendMessage(text, image);
      console.debug('message sent to threadId', threadId);
      props.setThreadId(threadId);

      const localMessages = createLocalMessages();
      setMessages((messages) => [...messages, ...localMessages]);
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
      return localMessages;
    }
  }

  return (
    <>
      <LoadingIndicator loading={loading} />
      <div id="window-wrapper">
        <div id="title-container">
          <h2 id="subject-title">{props.subject?.name}</h2>
          <button
            id="new-question-button"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              const confirmed = confirm(
                'Om du ställer en ny fråga kommer den här att försvinna. Är du säker?'
              );
              if (!confirmed) return;

              props.onNewQuestionClick();
            }}
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
