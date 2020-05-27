/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import {} from '../../useCookie';
import { AvatarModal } from './ProfilePage.AvatarModal';

interface HeaderProps {
  name: string;
}

export const Header = (props: HeaderProps) => {
  const [currentAvatarUrl, setCurrentAvatar] = useState(avatarUrls[0]);

  const [displayModal, setDisplayModal] = useState(false);

  return (
    <div id="profile-header">
      {displayModal && (
        <AvatarModal
          availableAvatars={avatarUrls}
          onComplete={(avatarUrl) => {
            setCurrentAvatar(avatarUrl);
            setDisplayModal(false);
          }}
        />
      )}
      <div
        id="profile-picture-wrapper"
        onClick={() => {
          setDisplayModal((display) => !display);
        }}
      >
        <img id="profile-picture" src={currentAvatarUrl} alt="profile" />
      </div>
      <div id="profile-info">
        <div id="profile-nameplate">
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
};

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
].map((url) => `./img/student_avatars/${url}`);
