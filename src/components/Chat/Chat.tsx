import React from "react";
import ConversationContainer from "./ConversationContainer";
import InputContainer from "./InputContainer";
import { establishSession, sendMessage, onMessage, OnMessageCallbackData } from "../../Api/api";
import { useState, useEffect } from "react";

interface ChatProps {
  name: string;
  subject: {
    id: string;
    name: string;
  };
}

export default function Chat(props: ChatProps) {
  const [messages, setMessages] = useState([] as OnMessageCallbackData[]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {

    if (!(props.name && props.subject)) {
      console.info("do nothing in effect");
      return;
    }
    
    establishSession(props.subject.id, props.name);
    console.info("session established");

    onMessage((m) => {
      console.log("message received from backend", m);
      setMessages((y) => [...y, m]);
    });
  }, [props.name, props.subject])

  function sendRealMessage(text: string, image?: File) {
    sendMessage(text, image);

    const localMessages: OnMessageCallbackData[] = [];

    if (image) {
      localMessages.push({
        toFrom: "to",
        text: "",
        name: props.name,
        image: URL.createObjectURL(image)
      })
    }

    if (text) {
      localMessages.push({
        toFrom: "to",
        text,
        name: props.name,
      })
    }

    setMessages((y)=>[...y, ...localMessages]);
    setCounter(counter + 1);
  }

  return (
    <div id="window-wrapper">
      <h2 id="subject-title">{props.subject.name}</h2>
      <div id="content-wrapper">
        <div id="chat-wrapper">
          <ConversationContainer messages={messages} />
          <InputContainer onSend={sendRealMessage} />
        </div>
      </div>
      <img
        id="logo"
        src="img/logo_white.svg"
        alt="Site Logo"
        draggable="false"
      />
    </div>
  );
}
