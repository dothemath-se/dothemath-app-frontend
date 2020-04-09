import React, { useState } from "react";

interface InputContainerProps {
  onSend: (arg0: string) => void;
}

export default function InputContainer(props: InputContainerProps) {
  const [message, setMessage] = useState("");

  return (
    <form
      id="chat-container"
      action=""
      onSubmit={(event) => event.preventDefault()}
    >
      <textarea
        // onInput="this.style.height = '';this.style.height = this.scrollHeight + 'px'"
        onChange={(e) => setMessage(e.target.value)}
        rows={1}
        id="chat-input"
        autoComplete="off"
        placeholder="Begin typing your message..."
        form="chat-container"
        style={{ height: "initial" }}
        value={message}
      />
      {/* <img id="selected-image" style={{ maxwidth: "30%" }} src="" alt="" />
      <input
        id="file-input"
        type="file"
        name="file"
        accept="image/*"
        style={{ display: "none" }}
      />
      <button id="select-image-button"></button> */}
      <button
        id="send-message-button"
        onClick={() => {
          props.onSend(message);
          setMessage("");
        }}
      ></button>
    </form>
  );
}
