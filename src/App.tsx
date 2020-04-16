import React, { useState, useEffect, DependencyList } from 'react';
import Popup from './components/Popup';
import SubjectList from './components/SubjectList';
import {
  getSubjects,
  reEstablishSession,
  OnMessageCallbackData,
  Subject,
  establishSession,
  onMessage,
  sendMessage,
  cancelSession,
} from './Api/api';
import Chat from './components/Chat';
import LoadingIndicator from './components/LoadingIndicator';
import { useCookie } from './useCookie';
import ErrorBoundary from './ErrorBoundary';

export default function App() {
  const [name, setName] = useCookie('name');
  const [threadId, setThreadId] = useCookie('threadId');
  const [channelId, setChannelId] = useCookie('channelId');

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([] as OnMessageCallbackData[]);

  const [subjects, setSubjects] = useState([] as Subject[]);
  useEffect(() => getSubjects(setSubjects), []);

  function useEffectAsync(asyncEffect: () => void, deps?: DependencyList) {
    useEffect(() => {
      asyncEffect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
  }

  // runs when app first loads, reestablishes session if possible
  useEffectAsync(async () => {
    if (channelId && !threadId) {
      setChannelId('');
    }
    if (threadId && channelId) {
      try {
        const res = await reEstablishSession(channelId, threadId);

        setName(res.name);
        setChannelId(res.subject.id);
        setMessages(res.messages);
      } catch (e) {
        setChannelId('');
        setThreadId('');
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    onMessage((m) => {
      console.log('message received from backend', m);
      setMessages((y) => [...y, m]);
    });
  }, []);

  async function onSubjectSelect(subject: Subject) {
    setChannelId(subject.id);
    setLoading(true);

    try {
      await establishSession(subject.id, name);
      console.info('session established');
      setMessages([]);
    } finally {
      setLoading(false);
      setThreadId('');
    }
  }

  async function onSendMessage(text: string, image?: File) {
    let isFirstMessage = messages.length === 0;
    const threadId = await sendMessage(text, image);
    if (isFirstMessage) {
      setThreadId(threadId);
    }

    const localMessages: OnMessageCallbackData[] = [];

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
  }

  function onNewQuestion() {
    setChannelId('');
    setThreadId('');
    setMessages([]);
    cancelSession();
  }

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
            name={name}
            subject={subject}
            messages={messages}
            onSendMessage={onSendMessage}
            onNewQuestionClick={onNewQuestion}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}
