import React, { useState, useRef } from 'react';

interface ChatInputContainerProps {
  onSend: (text: string, image?: File) => void;
}

export default function ChatInputContainer(props: ChatInputContainerProps) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFileInputChange(files: FileList | null) {
    if (files && files[0]) {
      setImage(files[0]);
    } else {
      setImage(null);
    }
  }

  function onSelectImageClick() {
    if (image) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setImage(null);
    } else {
      fileInputRef.current?.click();
    }
  }

  function onSendMessageClick() {
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
  }

  return (
    <form
      id="chat-container"
      action=""
      onSubmit={(event) => event.preventDefault()}
    >
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            onSendMessageClick();
          }
        }}
        rows={1}
        id="chat-input"
        autoComplete="off"
        placeholder="Begin typing your message..."
        form="chat-container"
        style={{ height: 'initial' }}
        value={message}
      />
      <input
        id="file-input"
        type="file"
        name="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => onFileInputChange(e.target.files)}
        ref={fileInputRef}
      />
      <button
        id="select-image-button"
        onClick={onSelectImageClick}
        style={{
          ...(!image
            ? { backgroundImage: 'url(/icons/image-solid.png)' }
            : { padding: '.8rem' }),
        }}
      >
        {image && image.name}
      </button>
      <button id="send-message-button" onClick={onSendMessageClick}></button>
    </form>
  );
}
