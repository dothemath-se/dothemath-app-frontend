/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useAsyncResource } from 'use-async-resource';

import * as api from '../../api/api';
import { useNamedState } from '../../useNamedState';
// import { OnMessageCallbackData } from '../../api/api';
import { Button } from '../Button';
import { ErrorBoundary } from '../ErrorBoundary';
import { LoadingIndicator } from '../LoadingIndicator';
import { ConversationContainer } from './Chat.ConversationContainer';
import { InputContainer } from './Chat.InputContainer';
import styles from './Chat.module.sass';
import { fetchInitialMessages } from './chatService3';
import { useChatService } from './useChatService';

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

export const Chat = (props: ChatProps) => (
  <React.Suspense fallback={<LoadingIndicator loading />}>
    <SuspendableChat {...props} />
  </React.Suspense>
);

const SuspendableChat = (props: ChatProps) => {
  const [initialMessagesReader] = useAsyncResource(
    fetchInitialMessages,
    props.name,
    props.subject.id,
    props.threadId,
    props.setThreadId
  );

  const [messages, setMessages] = useNamedState(
    // initialMessagesReader() as api.OnMessageCallbackData[],
    [] as api.OnMessageCallbackData[],
    'messages'
  );

  api.onMessage((m) => {
    setMessages((y) => [...y, m]);
  });

  // const [messages, sendMessage] = useChatService(
  //   props.name,
  //   props.subject.id,
  //   props.threadId,
  //   props.setThreadId
  // );

  async function sendMessage(text: string, image?: File) {
    try {
      const newThreadId = await api.sendMessage(text, image);
      console.debug('message sent to threadId', newThreadId);
      props.setThreadId(newThreadId);

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

  function handleNewQuestionClick() {
    if (messages.length > 0) {
      const confirmed = window.confirm(
        'Om du ställer en ny fråga kommer den här att försvinna. Är du säker?'
      );
      if (!confirmed) return;
    }

    props.onNewQuestionClick();
  }

  return (
    <>
      <div className={styles['title-container']}>
        <h2 className={styles['subject-title']}>{props.subject?.name}</h2>
        <Button
          primary
          className={styles['new-question-button']}
          onClick={handleNewQuestionClick}
        >
          Ställ en ny fråga
        </Button>
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles['chat-wrapper']}>
          <ConversationContainer
            messages={messages}
            messagesReader={initialMessagesReader}
          />
          <InputContainer onSend={sendMessage} />
        </div>
      </div>
      {/* <LoadingIndicator loading={loading} /> */}
    </>
  );
};
