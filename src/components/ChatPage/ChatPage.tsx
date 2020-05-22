import React, { useState, useEffect } from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import * as api from '../../api';
import { Chat } from '../Chat';
import { LoadingIndicator } from '../LoadingIndicator';

interface ChatPageProps {
  index: number | undefined;
  setIndex: (arg0: number) => void;
  threadId: string | undefined;
  setThreadId: (arg0: string) => void;
  channelId: string | undefined;
  setChannelId: (arg0: string) => void;
  allChatsArray: any | undefined;
  setAllChatsArray: (arg0: any) => void;
  name: string | undefined;
  setName: (arg0: string) => void;
}

export const ChatPage = (props: ChatPageProps) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([] as api.OnMessageCallbackData[]);

  const [subjects, setSubjects] = useState([] as api.Subject[]);

  useEffect(() => api.getSubjects(setSubjects), []);

  // runs when app first loads, reestablishes session if possible
  useEffect(() => {
    if (props.channelId && !props.threadId) {
      props.setChannelId('');
    }
    if (props.threadId && props.channelId) {
      api
        .reestablishSession(props.channelId, props.threadId)
        .then((res) => {
          props.setName(res.name);
          props.setChannelId(res.subject.id);
          setMessages(res.messages);
        })
        .catch((err) => {
          props.setChannelId('');
          props.setThreadId('');
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
    const firstVisit = props.allChatsArray === undefined;
    if (firstVisit) {
      props.setIndex(0);
    }
    props.setChannelId(subject.id);
    setLoading(true);

    api
      .establishSession(subject.id, props.name!)
      .then(() => {
        console.info('session established');
        setMessages([]);
      })
      .finally(() => {
        setLoading(false);
        props.setThreadId('');
      });
  };

  const onSendMessage = (text: string, image?: File) => {
    const isFirstMessage = messages.length === 0;
    const firstVisit = props.allChatsArray === undefined;
    api.sendMessage(text, image).then((threadId) => {
      if (isFirstMessage) {
        props.setThreadId(threadId);
        const newChatObject = {
          threadId: threadId,
          channelId: props.channelId,
          text: text,
          imageURL: '',
          checkmark: false,
        };
        if (firstVisit) {
          const firstChatArray = [newChatObject];
          props.setAllChatsArray(firstChatArray);
        } else {
          const allChatsArrayObject = props.allChatsArray.concat(newChatObject);
          props.setAllChatsArray(allChatsArrayObject);
          props.setIndex(allChatsArrayObject.length - 1);
        }
      }
    });

    const localMessages: api.OnMessageCallbackData[] = [];

    if (image) {
      localMessages.push({
        toFrom: 'to',
        text: '',
        name: props.name!,
        image: URL.createObjectURL(image),
      });
    }

    if (text) {
      localMessages.push({
        toFrom: 'to',
        text,
        name: props.name!,
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

    props.setChannelId('');
    props.setThreadId('');
    setMessages([]);
    api.cancelSession();
  };
  const onCheckmark = () => {
    const allChatsArrayObject = props.allChatsArray;
    if (allChatsArrayObject !== undefined) {
      if (allChatsArrayObject[props.index!] !== undefined) {
        if (
          allChatsArrayObject[props.index!].threadId !== '' &&
          allChatsArrayObject.length !== 0
        ) {
          allChatsArrayObject[props.index!].checkmark = true;
          props.setAllChatsArray(allChatsArrayObject);
        } else {
          console.log('No question yet');
        }
      }
    } else {
      console.log('No question yet');
    }
  };
  const subject = subjects.find((s) => s.id === props.channelId);

  const showPopup = !props.name && !loading;
  const showSubjectList = !subject && !showPopup && !loading;
  const blurChat = showPopup || showSubjectList || loading;

  return (
    <div>
      {loading && <LoadingIndicator loading />}
      {showPopup && <Popup onComplete={props.setName} />}
      {showSubjectList && (
        <SubjectList data={subjects} onComplete={onSubjectSelect} />
      )}
      <div style={blurChat ? { filter: 'blur(5px)' } : {}}>
        <Chat
          subject={subject}
          messages={messages}
          onSendMessage={onSendMessage}
          onNewQuestionClick={onNewQuestion}
          index={props.index!}
          allChats={props.allChatsArray}
          onCheckmarkClick={onCheckmark}
        />
      </div>
    </div>
  );
};
