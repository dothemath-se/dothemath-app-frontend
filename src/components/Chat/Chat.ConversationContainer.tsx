import React from 'react';

import { ErrorBoundary } from '../ErrorBoundary';
import { LoadingIndicator } from '../LoadingIndicator';
import styles from './Chat.module.sass';

interface ConversationContainerProps {
  messages: {
    toFrom: string;
    text: string;
    name: string;
    image?: string;
  }[];

  messagesReader: () => {
    toFrom: string;
    text: string;
    name: string;
    image?: string;
  }[];
}

export const ConversationContainer = (props: ConversationContainerProps) => (
  <div className={styles['conversation-container']}>
    <React.Suspense fallback="Laddar chatthistorik...">
      <SuspendableConversationContainer {...props} />
    </React.Suspense>
  </div>
);

export const SuspendableConversationContainer = (
  props: ConversationContainerProps
) => {
  props.messagesReader();
  return (
    <>
      {props.messages
        .map((item, index) => (
          <div className={styles['chat-bubble--' + item.toFrom]} key={index}>
            {item.image && <img src={item.image} alt="" />}
            <p className={styles['chat-text']}>{item.text}</p>
            <p className={styles['from-user']}>{item.name}</p>
          </div>
        ))
        // We are using 'flex-direction: column-reverse' and therefore we reverse the messages before render.
        .reverse()}
    </>
  );
};
