import React from 'react';
import ConversationContainer from "./ConversationContainer";

export default {
  title: 'Chat/ConversationContainer',
};

export const Default = () => <ConversationContainer messages={fakeMessages} />;

const fakeMessages = [
  {
    toFrom: "from",
    text: "Hej själv",
    name: "Bull",
    image: null,
  },
  {
    toFrom: "to",
    text: "Hej du",
    name: "Bill",
    image: null,
  },
];