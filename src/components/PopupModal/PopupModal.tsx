import React, { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import { Button } from '../Button';

export interface PopupModalProps {
  onCloseClick: () => any;
  isOpen?: boolean;
}

export const PopupModal = (props: PropsWithChildren<PopupModalProps>) => {
  return (
    <ReactModal
      isOpen={!!props.isOpen}
      onRequestClose={props.onCloseClick}
      style={{
        overlay: {
          zIndex: 100,
        },
      }}
      ariaHideApp={false}
    >
      {props.children}
      <Button primary onClick={props.onCloseClick}>
        Stäng
      </Button>
    </ReactModal>
  );
};
