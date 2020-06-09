import React, { useRef, useState } from 'react';

import { Button } from '../Button';
import styles from './Chat.module.sass';

interface InputContainerProps {
  onSend: (text: string, image?: File) => void;
}

export const InputContainer = (props: InputContainerProps) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileInputChange = (files: FileList | null) => {
    if (files && files[0]) {
      setImage(files[0]);
    } else {
      setImage(null);
    }
  };

  const onSelectImageClick = () => {
    if (image) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setImage(null);
    } else {
      fileInputRef.current?.click();
    }
  };

  const onSendMessageClick = () => {
    if (image) {
      props.onSend(message, image);
    } else if (message) {
      props.onSend(message);
    }
    setMessage('');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form
      className={styles['input-container']}
      action=""
      onSubmit={(event) => event.preventDefault()}
    >
      <textarea
        className={styles['chat-input']}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            onSendMessageClick();
          }
        }}
        rows={1}
        autoComplete="off"
        placeholder="Skriv ditt meddelande här..."
        aria-label="Skriv ditt meddelande här..."
        style={{ height: 'initial' }}
        value={message}
      />
      <input
        className={styles['file-input']}
        type="file"
        accept="image/*"
        onChange={(e) => onFileInputChange(e.target.files)}
        ref={fileInputRef}
      />
      <Button
        primary
        className={styles['select-image-button']}
        aria-label="Välj en bild att bifoga"
        onClick={onSelectImageClick}
        style={{
          ...(!image
            ? { backgroundImage: 'url(/icons/image-solid.png)' }
            : { padding: '.8rem' }),
        }}
      >
        {image && image.name}
      </Button>
      <Button
        primary
        className={styles['send-message-button']}
        aria-label="Skicka meddelande"
        onClick={onSendMessageClick}
      />
    </form>
  );
};
