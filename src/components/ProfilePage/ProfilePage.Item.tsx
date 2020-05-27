import React from 'react';

interface ItemProps {
  key: any;
  index: number;
  checkmark: boolean;
  text: string;
  imgURL: string;
  goToChat: (arg0: number) => void;
}

export const Item = (props: ItemProps) => (
  <div className="profile-item" onClick={() => props.goToChat(props.index)}>
    {props.checkmark ? (
      <div className="profile-item-checkmark">
        <img
          src="icons/check-mark-3-512.png"
          alt="checkmark"
          className="profile-item-checkmark-img"
        />
      </div>
    ) : (
      <div className="profile-item-emptycheckmark">
        <img
          src="icons/check-mark-3-512.png"
          alt="checkmark"
          className="profile-item-checkmark-img"
        />
      </div>
    )}
    <div className="profile-item-text">
      <p>{props.text}</p>
    </div>
    {props.imgURL && (
      <img className="profile-item-img" src={props.imgURL} alt="item-img" />
    )}
  </div>
);
