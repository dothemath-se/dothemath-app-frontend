import React from 'react';
import { ProfilePage } from './ProfilePage';

export default {
  title: 'ProfilePage',
};

export const Default = () => (
  <ProfilePage
    goToChat={(a) => a}
    allChatsArray={1}
    index={1}
    currentAvatar={
      process.env.PUBLIC_URL + './img/student_avatars/student1.png'
    }
    setCurrentAvatar={(a) => a}
    name={'Måns'}
  />
);
