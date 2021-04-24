import { Chat } from './Chat';

export default {
  title: 'Chat/Chat',
};

export const Default = () => (
  <Chat
    name="kalle anka"
    subject={{ id: '', name: '#somechannel' }}
    threadId={''}
    setThreadId={() => {}}
    onNewQuestionClick={() => {}}
  />
);
