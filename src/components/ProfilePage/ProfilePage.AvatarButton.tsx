import React from 'react';

interface AvatarButtonProps {
  key: any;
  imgsrc: string;
  setCurrentAvatar: (arg0: string) => void;
  toggleAvatarModal: () => void;
}

export const AvatarButton = (props: AvatarButtonProps) => (
  <div
    className="profile-avatar-button"
    onClick={() => {
      props.setCurrentAvatar(props.imgsrc);
      props.toggleAvatarModal();
    }}
  >
    <img
      src={props.imgsrc}
      alt={'avatar'}
      className={'profile-avatar-button-image'}
    ></img>
  </div>
);
