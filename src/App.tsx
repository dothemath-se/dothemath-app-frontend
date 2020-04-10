/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import SubjectList from './components/SubjectList';
import { getSubjects } from './Api/api';
import Chat from './components/Chat';
import { useNameCookie } from './useNameCookie';

export default function App() {
  const [name, setName] = useNameCookie();

  const [subjects, setSubjects] = useState([]);
  useEffect(() => getSubjects(setSubjects), []);
  const [subject, setSubject] = useState('' as any);

  const showPopup = !name;
  const showSubjectList = !subject && !showPopup;
  const blurChat = showPopup || showSubjectList;

  return (
    <div>
      {showPopup && <Popup onComplete={setName} />}
      {showSubjectList && (
        <SubjectList data={subjects} onComplete={setSubject} />
      )}
      <div style={blurChat ? { filter: 'blur(5px)' } : {}}>
        <Chat name={name} subject={subject} />
      </div>
    </div>
  );
}
