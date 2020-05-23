import React, { useState } from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import * as api from '../../api';
import { Chat } from '../Chat';
import { useCookie } from '../../useCookie';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { LoadingIndicator } from '../LoadingIndicator';
import { useAsyncEffect } from 'use-async-effect';

export const App = () => {
  const [name, setName] = useCookie('name');
  const [threadId, setThreadId] = useCookie('threadId');
  const [subject, setSubject] = useCookie('subject');

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([] as api.OnMessageCallbackData[]);

  function wait<T>(ms: number, value?: T) {
    return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
  }

  // runs when app first loads, reestablishes session if possible
  useAsyncEffect(async () => {
    if (subject?.id && !threadId) {
      setSubject('');
      setThreadId('');
      setMessages([]);
    } else if (subject?.id && threadId) {
      try {
        setLoading(true);
        const result = await api.reestablishSession(subject.id, threadId);
        await wait(1000);
        console.info('session reestablished!');
        setMessages(result.messages);
      } catch (error) {
        setSubject('');
        setThreadId('');
        setMessages([]);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    api.onMessage((m) => {
      setMessages((y) => [...y, m]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubjectSelect = async (subject: api.Subject) => {
    try {
      setLoading(true);
      await api.establishSession(subject.id, name);
      await wait(1000);
      console.info('session established!');
      setSubject(subject);
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

    setSubject('');
    setThreadId('');
    setMessages([]);
    api.cancelSession();
  };

  const history = useHistory();

  const SubjectListGuard = () => {
    if (!name) return <Redirect to="/start" />;
    return null;
  };

  const ChatGuard = () => {
    if (!name) return <Redirect to="/start" />;
    if (!subject && !loading) return <Redirect to="/subject" />;
    return null;
  };

  const RootGuard = () => {
    if (!name) return <Redirect to="/start" />;
    if (!subject) return <Redirect to="/subject" />;
    return <Redirect to="/chat" />;
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <Switch>
        <Route path="/start">
          <Popup
            disableCaptcha
            onComplete={(name) => {
              setName(name);
              history.replace('/subject');
            }}
          />
        </Route>
        <Route path="/subject">
          <SubjectListGuard />
          <SubjectList
            onComplete={(subject) => {
              onSubjectSelect(subject);
              history.replace('/chat');
            }}
          />
        </Route>
        <Route path="/chat">
          <ChatGuard />
          <Chat
            subject={subject}
            messages={messages}
            onSendMessage={onSendMessage}
            }}
          />
        </Route>
        <Route path="/">
          <RootGuard />
        </Route>
      </Switch>
    </>
  );
};
