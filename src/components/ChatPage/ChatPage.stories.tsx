import React from 'react';
import { ChatPage } from './ChatPage';

export default {
  title: 'ChatPage',
};

const c = [{ threadid: '1', channelId: '2' }];
export const Default = () => (
  <ChatPage
    index={0}
    setIndex={(a) => a * 2}
    threadId={'1589918082.038400'}
    channelId={'C013Z0CUZ9P'}
    setThreadId={(b) => b + 'x'}
    setChannelId={(b) => b + 'x'}
    name={'Månne'}
    allChatsArray={c}
    setAllChatsArray={(c) => 1}
    setName={(b) => 1}
  />
);
