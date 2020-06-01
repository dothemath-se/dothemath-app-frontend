import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { useCookie } from '../../useCookie';
import { Chat } from '../Chat';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';

export const App = () => {
  const [name, setName] = useCookie<string>('name');
  const [subject, setSubject] = useCookie<{ name: string; id: string }>(
    'subject'
  );
  const [threadId, setThreadId] = useCookie<string>('threadId');

  const history = useHistory();

  return (
    <>
      <div id="window-wrapper">
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
        <img
          id="logo"
          src="img/logo_white.svg"
          alt="Site Logo"
          draggable="false"
        />
        <a
          href="https://vercel.com/?utm_source=dothemath"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            id="logo-vercel"
            src="img/powered-by-vercel.svg"
            alt="Powered by Vercel"
            draggable="false"
          />
        </a>
      </div>
    </>
  );
};
