/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

interface AvatarModalProps {
  availableAvatars: string[];
  onComplete: (selectedAvatar: string) => void;
}

export const AvatarModal = (props: AvatarModalProps) => (
  <div id="profile-avatar-container">
    <div style={{ position: 'relative' }}>
      <div id="profile-avatar-modalarrow"></div>
      <div id="profile-avatar-modal">
        {props.availableAvatars.map((avatarUrl) => (
          <div
            key={avatarUrl}
            className="profile-avatar-button"
            onClick={() => props.onComplete(avatarUrl)}
          >
            <img
              src={avatarUrl}
              alt="avatar"
              className={'profile-avatar-button-image'}
            ></img>
          </div>
        ))}
      </div>
    </div>
  </div>
);
