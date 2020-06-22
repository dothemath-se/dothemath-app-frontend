/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useAsyncResource } from 'use-async-resource';

import * as api from '../../api/api';
import { useNamedState } from '../../useNamedState';

export function useSomeThings(
  name: string,
  subjectId: string,
  threadId: string,
  setThreadId: (threadId: string) => void
) {
  const [messages, setMessages] = useNamedState(
    [] as api.OnMessageCallbackData[],
    'messages'
  );

  // const [messagesReader] = useAsyncResource(
  //   doOtherThings,
  //   name,
  //   subjectId,
  //   threadId,
  //   setThreadId
  // );

  async function sendMessage(text: string, image?: File) {
    try {
      const newThreadId = await api.sendMessage(text, image);
      console.debug('message sent to threadId', newThreadId);
      setThreadId(newThreadId);

      const localMessages = createLocalMessages();
      setMessages((existingMessages) => [
        ...existingMessages,
        ...localMessages,
      ]);
      console.debug('localMessages added', localMessages);
    } catch (error) {
      console.log(error);
    }

    function createLocalMessages() {
      const localMessages = [] as api.OnMessageCallbackData[];

      if (image) {
        localMessages.push({
          toFrom: 'to',
          text: '',
          name: name,
          image: URL.createObjectURL(image),
        });
      }

      if (text) {
        localMessages.push({
          toFrom: 'to',
          text,
          name: name,
        });
      }

      return localMessages;
    }
  }

  return [messages, sendMessage];
}

export async function fetchInitialMessages(
  name: string,
  subjectId: string,
  threadId: string,
  setThreadId: (threadId: string) => void
) {
  try {
    const messages = getMessages();
    // api.onMessage((m) => {
    //   setMessages((y) => [...y, m]);
    // });
    return messages;
  } catch (error) {
    console.error(error);
    throw error;
  }

  async function getMessages() {
    if (!threadId) {
      await establishSession();
      return [];
    } else {
      try {
        const existingMessages = await reestablishSession();
        return existingMessages;
      } catch (error) {
        console.warn(error);
        setThreadId('');
        await establishSession();
        return [];
      }
    }
  }

  async function establishSession() {
    await api.establishSession(subjectId, name);
    console.info('chat session established');
  }

  async function reestablishSession() {
    const result = await api.reestablishSession(subjectId, threadId);
    console.info('chat session reestablished');
    return result.messages;
  }
}
