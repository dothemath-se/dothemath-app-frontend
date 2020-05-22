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
  onSendMessage(text: string, image?: File): any;
  onNewQuestionClick(): any;
  index: number;
  allChats: any;
  onCheckmarkClick(): any;
}

export const Chat = (props: ChatProps) => {
  const { messages } = props;

  console.log(props.allChats);

  const emptyCheckmark = (
    <button
      id="chat-empty-checkmark"
      className="profile-item-emptycheckmark"
      onClick={props.onCheckmarkClick}
    >
      <img
        src="icons/check-mark-3-512.png"
        style={{ width: '25px' }}
        alt="checkmark-empty"
      />
    </button>
  );

  const checkedCheckmark = (
    <button id="chat-checkmark" className="profile-item-checkmark">
      <img
        src="icons/check-mark-3-512.png"
        alt="checkmark"
        style={{ width: '25px' }}
      />
    </button>
  );

  const displayCheckmark = (checked) => {
    if (checked) {
      return checkedCheckmark;
    } else {
      return emptyCheckmark;
    }
  };

  const displayInputField = (checked) => {
    if (checked) {
      return <InputContainer onSend={props.onSendMessage} />;
    }
  };

  const answeredQuestion = () => {
    if (props.allChats === undefined) {
      return false;
    } else if (props.allChats[props.index] === undefined) {
      return false;
    } else if (props.allChats[props.index].checkmark) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id="window-wrapper">
      <div id="title-container">
        <button onClick={props.onNewQuestionClick} id="new-question-button">
          Ställ en ny fråga
        </button>
        <h2 id="subject-title">{props.subject?.name}</h2>
        {displayCheckmark(answeredQuestion())}
      </div>
      <div id="content-wrapper">
        <div id="chat-wrapper">
          <ConversationContainer messages={messages} />
          {displayInputField(!answeredQuestion())}
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
