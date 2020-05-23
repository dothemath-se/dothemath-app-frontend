import React from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import * as api from '../../api';
import { Chat } from '../Chat';
import { useCookie } from '../../useCookie';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

export const App = () => {
  const [name, setName] = useCookie('name');
  const [subject, setSubject] = useCookie('subject');
  const [threadId, setThreadId] = useCookie('threadId');

  const onNewQuestion = () => {
    setSubject('');
    setThreadId('');
    api.cancelSession();
  };

  const history = useHistory();

  const SubjectListGuard = () => {
    if (!name) return <Redirect to="/start" />;
    return null;
  };

  const ChatGuard = () => {
    if (!name) return <Redirect to="/start" />;
    if (!subject) return <Redirect to="/subject" />;
    return null;
  };

  const RootGuard = () => {
    if (!name) return <Redirect to="/start" />;
    if (!subject) return <Redirect to="/subject" />;
    return <Redirect to="/chat" />;
  };

  return (
    <>
      <Switch>
        <Route path="/start">
          <Popup
            onComplete={(newName) => {
              setName(newName);
              history.replace('/subject');
            }}
          />
        </Route>
        <Route path="/subject">
          <SubjectListGuard />
          <SubjectList
            onComplete={(newSubject) => {
              setSubject(newSubject);
              setThreadId('');
              history.replace('/chat');
            }}
          />
        </Route>
        <Route path="/chat">
          <ChatGuard />
          <Chat
            name={name}
            subject={subject}
            threadId={threadId}
            setThreadId={setThreadId}
            onNewQuestionClick={onNewQuestion}
          />
        </Route>
        <Route path="/">
          <RootGuard />
        </Route>
      </Switch>
    </>
  );
};
