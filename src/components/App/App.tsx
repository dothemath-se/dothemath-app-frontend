import React, { useState, useEffect } from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import * as api from '../../api';
import { Chat } from '../Chat';
import { LoadingIndicator } from '../LoadingIndicator';
import { useCookie } from '../../useCookie';
import { ErrorBoundary } from '../ErrorBoundary';
import { useAsyncEffect } from 'use-async-effect';

export const App = () => {
  const [name, setName] = useCookie('name');
  const [threadId, setThreadId] = useCookie('threadId');
  const [channelId, setChannelId] = useCookie('channelId');

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([] as api.OnMessageCallbackData[]);

  const [subjects, setSubjects] = useState([] as api.Subject[]);
  useEffect(() => api.getSubjects(setSubjects), []);

  // runs when app first loads, reestablishes session if possible
  useAsyncEffect(async () => {
    if (channelId && !threadId) {
      setChannelId('');
      setThreadId('');
      setMessages([]);
    } else if (channelId && threadId) {
      try {
        setLoading(true);
        const result = await api.reestablishSession(channelId, threadId);
        console.info('session reestablished!');
        setMessages(result.messages);
      } catch (error) {
        setChannelId('');
        setThreadId('');
        setMessages([]);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    api.onMessage((m) => {
      console.log('message received from backend', m);
      setMessages((y) => [...y, m]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubjectSelect = async (subject: api.Subject) => {
    try {
      setLoading(true);
      await api.establishSession(subject.id, name);
      console.info('session established!');
      setChannelId(subject.id);
      setThreadId('');
      setMessages([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSendMessage = async (text: string, image?: File) => {
    try {
      const threadId = await api.sendMessage(text, image);

      const isFirstMessage = messages.length === 0;
      if (isFirstMessage) {
        setThreadId(threadId);
      }

      const localMessages: api.OnMessageCallbackData[] = [];

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

      setMessages((messages) => [...messages, ...localMessages]);
    } catch (error) {
      console.log(error);
    }
  };

  const onNewQuestion = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm(
      'Om du ställer en ny fråga kommer den här att försvinna. Är du säker?'
    );
    if (!confirmed) return;

    setChannelId('');
    setThreadId('');
    setMessages([]);
    api.cancelSession();
  };

  const subject = subjects.find((s) => s.id === channelId);

  const showPopup = !name && !loading;
  const showSubjectList = !subject && !showPopup && !loading;
  const blurChat = showPopup || showSubjectList || loading;

  return (
    <ErrorBoundary>
      <div>
        {loading && <LoadingIndicator loading />}
        {showPopup && <Popup onComplete={setName} />}
        {showSubjectList && (
          <SubjectList data={subjects} onComplete={onSubjectSelect} />
        )}
        <div style={blurChat ? { filter: 'blur(5px)' } : {}}>
          <Chat
            subject={subject}
            messages={messages}
            onSendMessage={onSendMessage}
            onNewQuestionClick={onNewQuestion}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};
