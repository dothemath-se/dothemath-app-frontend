import React, { useState } from 'react';
import { AvatarModal } from './ProfilePage.AvatarModal';

interface HeaderProps {
  name: string | undefined;
  level: number;
  currentAvatar: string | undefined;
  setCurrentAvatar: (arg0: string) => void;
}

export const Header = (props: HeaderProps) => {
  const [toggle, setToggle] = useState('none');

  const toggleAvatarModal = () =>
    setToggle(toggle === 'none' ? 'block' : 'none');

  return (
    <div id="profile-header">
      <AvatarModal
        toggle={toggle}
        toggleAvatarModal={toggleAvatarModal}
        setCurrentAvatar={props.setCurrentAvatar}
      />
      <div id="profile-picture-wrapper" onClick={toggleAvatarModal}>
        <img id="profile-picture" src={props.currentAvatar} alt="profile" />
      </div>
      <div id="profile-info">
        <div id="profile-nameplate">
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
};
