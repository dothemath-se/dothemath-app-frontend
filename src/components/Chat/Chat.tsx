import React from 'react';
import { ConversationContainer } from './Chat.ConversationContainer';
import { InputContainer } from './Chat.InputContainer';
import { OnMessageCallbackData } from '../../api';

interface ChatProps {
  subject?: {
    id: string;
    name: string;
  };
  messages: OnMessageCallbackData[];
  onSendMessage: (text: string, image?: File) => any;
  onNewQuestionClick: () => any;
}

export const Chat = (props: ChatProps) => {
  const { messages } = props;

  return (
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
          <InputContainer onSend={props.onSendMessage} />
        </div>
      </div>
      <img
        id="logo"
        src="img/logo_white.svg"
        alt="Site Logo"
        draggable="false"
      />
    </div>
  );
};
