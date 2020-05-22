import React, { useState, useEffect } from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import * as api from '../../api';
import { Chat } from '../Chat';
import { useCookie } from '../../useCookie';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { LoadingIndicator } from '../LoadingIndicator';

export const App = () => {
  const [name, setName] = useCookie('name');
  const [threadId, setThreadId] = useCookie('threadId');
  const [channelId, setChannelId] = useCookie('channelId');

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([] as api.OnMessageCallbackData[]);

  const [subjects, setSubjects] = useState([] as api.Subject[]);
  useEffect(() => api.getSubjects(setSubjects), []);

  // runs when app first loads, reestablishes session if possible
  useEffect(() => {
    if (channelId && !threadId) {
      setChannelId('');
    }
    if (threadId && channelId) {
      api
        .reestablishSession(channelId, threadId)
        .then((res) => {
          setName(res.name);
          setChannelId(res.subject.id);
          setMessages(res.messages);
        })
        .catch((err) => {
          setChannelId('');
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
      setMessages((y) => [...y, m]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubjectSelect = (subject: api.Subject) => {
    setChannelId(subject.id);
    setLoading(true);

    api
      .establishSession(subject.id, name)
      .then(() => {
        console.info('session established');
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

    setChannelId('');
    setThreadId('');
    setMessages([]);
    api.cancelSession();
  };

  const subject = subjects.find((s) => s.id === channelId);

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
            data={subjects}
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
