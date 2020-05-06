import React from 'react';
import { ChatConversationContainer } from './ChatConversationContainer';
import { ChatInputContainer } from './ChatInputContainer';
import { OnMessageCallbackData } from '../../api';

interface ChatProps {
  name: string;
  subject?: {
    id: string;
    name: string;
  };
  messages: OnMessageCallbackData[];
  onSendMessage(text: string, image?: File): any;
  onNewQuestionClick(): any;
}

export function Chat(props: ChatProps) {
  const { messages } = props;

  return (
    <div id="window-wrapper">
      <div id="title-container">
        <h2 id="subject-title">{props.subject?.name}</h2>
        <button onClick={props.onNewQuestionClick} id="new-question-button">
          Ask New Question
        </button>
      </div>
      <div id="content-wrapper">
        <div id="chat-wrapper">
          <ChatConversationContainer messages={messages} />
          <ChatInputContainer onSend={props.onSendMessage} />
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
}
