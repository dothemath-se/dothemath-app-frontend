import React from 'react';

import { LoadingIndicator } from '../LoadingIndicator';
import { ConversationContainer } from './Chat.ConversationContainer';
import { InputContainer } from './Chat.InputContainer';
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

export const Chat = (props: ChatProps) => {
  const [messages, sendMessage, loading] = useChatService(
    props.name,
    props.subject.id,
    props.threadId,
    props.setThreadId
  );

  function handleNewQuestionClick() {
    if (messages.length > 0) {
      // eslint-disable-next-line no-restricted-globals
      const confirmed = confirm(
        'Om du ställer en ny fråga kommer den här att försvinna. Är du säker?'
      );
      if (!confirmed) return;
    }

    props.onNewQuestionClick();
  }

  return (
    <>
      <div id="window-wrapper">
        <div id="title-container">
          <h2 id="subject-title">{props.subject?.name}</h2>
          <button id="new-question-button" onClick={handleNewQuestionClick}>
            Ställ en ny fråga
          </button>
        </div>
        <div id="content-wrapper">
          <div id="chat-wrapper">
            <ConversationContainer messages={messages} />
            <InputContainer onSend={sendMessage} />
          </div>
        </div>
        <img
          id="logo"
          src="img/logo_white.svg"
          alt="Site Logo"
          draggable="false"
        />
        <a
          href="https://vercel.com/?utm_source=dothemath"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            id="logo-vercel"
            src="img/powered-by-vercel.svg"
            alt="Powered by Vercel"
            draggable="false"
          />
        </a>
      </div>
      <LoadingIndicator loading={loading} />
    </>
  );
};
