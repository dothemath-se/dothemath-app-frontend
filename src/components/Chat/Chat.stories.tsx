import React from 'react';
import { Chat } from './Chat';

export default {
  title: 'Chat/Chat',
};

export const Default = () => (
  <Chat
    subject={{ id: '', name: '' }}
    messages={fakeMessages}
    onSendMessage={() => {}}
    onNewQuestionClick={() => {}}
    index={3}
    allChats={1}
    onCheckmarkClick={() => 1}
  />
);

const fakeMessages = [
  {
    toFrom: 'from' as 'from',
    text: 'Hej själv',
    name: 'Bull',
  },
  {
    toFrom: 'to' as 'to',
    text: 'Hej du',
    name: 'Bill',
  },
];
