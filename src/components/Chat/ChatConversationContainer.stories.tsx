import React from 'react';
import ChatConversationContainer from './ChatConversationContainer';

export default {
  title: 'Chat/ChatConversationContainer',
};

export const Default = () => (
  <ChatConversationContainer messages={fakeMessages} />
);

const fakeMessages = [
  {
    toFrom: 'from',
    text: 'Hej själv',
    name: 'Bull',
  },
  {
    toFrom: 'to',
    text: 'Hej du',
    name: 'Bill',
  },
];
