import { ConversationContainer } from './Chat.ConversationContainer';

export default {
  title: 'Chat/ConversationContainer',
};

export const Default = () => <ConversationContainer messages={fakeMessages} />;

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
