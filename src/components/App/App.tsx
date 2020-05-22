import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { ProfilePage } from '../ProfilePage';
import { ChatPage } from '../ChatPage';
import { useCookie } from '../../useCookie';
import { ErrorBoundary } from '../ErrorBoundary';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const App = () => {
  const [name, setName] = useCookie('name');
  const [index, setIndex] = useCookie('index');

  const [threadId, setThreadId] = useCookie('threadId');
  const [channelId, setChannelId] = useCookie('channelId');
  const [allChatsArray, setAllChatsArray] = useCookie('allChatsArray');
  const [currentAvatar, setCurrentAvatar] = useCookie('currentAvatar');

  const goToChat = (itemIndex) => {
    setThreadId(allChatsArray[itemIndex].threadId);
    setChannelId(allChatsArray[itemIndex].channelId);
    setIndex(itemIndex);
    history.push('/');
  };

  return (
    <ErrorBoundary>
      <Router history={history}>
        <div id="site-wrapper">
          <Switch>
            <Route path="/profile">
              <ProfilePage
                goToChat={goToChat}
                allChatsArray={allChatsArray}
                index={index}
                currentAvatar={currentAvatar}
                setCurrentAvatar={setCurrentAvatar}
                name={name}
              />
            </Route>
            <Route path="/">
              <ChatPage
                index={index}
                setIndex={setIndex}
                threadId={threadId}
                setThreadId={setThreadId}
                channelId={channelId}
                setChannelId={setChannelId}
                allChatsArray={allChatsArray}
                setAllChatsArray={setAllChatsArray}
                name={name}
                setName={setName}
              />
            </Route>
          </Switch>
          <div id="tab-bar">
            <div>
              <Link to="/profile">
                <button>
                  <img src="/icons/student-512.png" alt="profile"></img>
                </button>
              </Link>
            </div>
            <div>
              <Link to="/">
                <button>
                  <img src="/icons/chat-4-512.png" alt="chat"></img>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};
