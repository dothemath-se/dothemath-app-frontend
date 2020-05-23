import React from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import { Chat } from '../Chat';
import { useCookie } from '../../useCookie';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

export const App = () => {
  const [name, setName] = useCookie('name');
  const [subject, setSubject] = useCookie('subject');
  const [threadId, setThreadId] = useCookie('threadId');

  const history = useHistory();

  return (
    <>
      <Switch>
        <Route exact path="/">
          {!name ? (
            <Redirect to="/start" />
          ) : !subject ? (
            <Redirect to="/subject" />
          ) : (
            <Redirect to="/chat" />
          )}
        </Route>
        <Route path="/start">
          <Popup
            onComplete={(newName) => {
              setName(newName);
              history.replace('/subject');
            }}
          />
        </Route>
        <Route path="/subject">
          <SubjectList
            onComplete={(newSubject) => {
              setSubject(newSubject);
              setThreadId('');
              history.replace('/chat');
            }}
          />
        </Route>
        <Route path="/chat">
          <Chat
            name={name}
            subject={subject}
            threadId={threadId}
            setThreadId={setThreadId}
            onNewQuestionClick={() => {
              history.replace('/subject');
            }}
          />
        </Route>
      </Switch>
    </>
  );
};
