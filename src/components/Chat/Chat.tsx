import React from 'react';

import { Button } from '../Button';
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
      const confirmed = window.confirm(
        'Om du ställer en ny fråga kommer den här att försvinna. Är du säker?'
      );
      if (!confirmed) return;
    }

    props.onNewQuestionClick();
  }

  return (
    <>
      <div className="chat--title-container">
        <h2 className="chat--subject-title">{props.subject?.name}</h2>
        <Button
          primary
          className="chat--new-question-button"
          onClick={handleNewQuestionClick}
        >
          Ställ en ny fråga
        </Button>
      </div>
      <div className="chat--content-wrapper">
        <div className="chat--chat-wrapper">
          <ConversationContainer messages={messages} />
          <InputContainer onSend={sendMessage} />
        </div>
      </div>
      <LoadingIndicator loading={loading} />
    </>
  );
};
