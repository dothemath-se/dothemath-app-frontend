import React from 'react';
import { AvatarButton } from './ProfilePage.AvatarButton';

interface AvatarModalProps {
  toggle: string;
  setCurrentAvatar: (arg0: string) => void;
  toggleAvatarModal: () => void;
}

export const AvatarModal = (props: AvatarModalProps) => {
  const avatarUrls = [
    'student1.png',
    'student2.png',
    'student3.png',
    'student4.png',
    'student5.png',
    'student6.png',
    'student7.png',
    'student8.png',
    'student9.png',
    'student10.png',
    'student11.png',
    'student12.png',
    'student13.png',
    'student14.png',
    'student15.png',
  ];

  const avatars = avatarUrls.map((avatarUrl) => {
    return (
      <AvatarButton
        key={avatarUrl}
        imgsrc={process.env.PUBLIC_URL + './img/student_avatars/' + avatarUrl}
        setCurrentAvatar={props.setCurrentAvatar}
        toggleAvatarModal={props.toggleAvatarModal}
      />
    );
  });

  return (
    <div id="profile-avatar-container" style={{ display: props.toggle }}>
      <div style={{ position: 'relative' }}>
        <div id="profile-avatar-modalarrow"></div>
        <div id="profile-avatar-modal">{avatars}</div>
      </div>
    </div>
  );
};
