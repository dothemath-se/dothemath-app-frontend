import React, { useState, useEffect } from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import * as api from '../../api';
import { Chat } from '../Chat';
import { LoadingIndicator } from '../LoadingIndicator';
import { useCookie } from '../../useCookie';
import { ErrorBoundary } from '../ErrorBoundary';

export const App = () => {
  const [name, setName] = useCookie('name');
  const [threadId, setThreadId] = useCookie('threadId');
  const [subject, setSubject] = useCookie('subject');

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([] as api.OnMessageCallbackData[]);

  // runs when app first loads, reestablishes session if possible
  useEffect(() => {
    if (subject && !threadId) {
      setSubject('');
    }
    if (subject && threadId) {
      api
        .reestablishSession(subject.id, threadId)
        .then((res) => {
          console.info('session reestablished!');
          setMessages(res.messages);
        })
        .catch((err) => {
          setSubject('');
          setThreadId('');
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    api.onMessage((m) => {
      console.log('message received from backend', m);
      setMessages((y) => [...y, m]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubjectSelect = (subject: api.Subject) => {
    setSubject(subject);
    setLoading(true);

    api
      .establishSession(subject.id, name)
      .then(() => {
        console.info('session established!');
        setMessages([]);
      })
      .finally(() => {
        setLoading(false);
        setThreadId('');
      });
  };

  const onSendMessage = (text: string, image?: File) => {
    let isFirstMessage = messages.length === 0;
    api.sendMessage(text, image).then((threadId) => {
      if (isFirstMessage) {
        setThreadId(threadId);
      }
    });

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
  };

  const onNewQuestion = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm(
      'Om du ställer en ny fråga kommer den här att försvinna. Är du säker?'
    );
    if (!confirmed) return;

    setSubject('');
    setThreadId('');
    setMessages([]);
    api.cancelSession();
  };

  const showPopup = !name && !loading;
  const showSubjectList = !subject && !showPopup && !loading;
  const blurChat = showPopup || showSubjectList || loading;

  return (
    <ErrorBoundary>
      <div>
        {loading && <LoadingIndicator loading />}
        {showPopup && <Popup onComplete={setName} />}
        {showSubjectList && <SubjectList onComplete={onSubjectSelect} />}
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
