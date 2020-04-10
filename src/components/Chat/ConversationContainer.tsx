import React from "react";

interface ConversationContainerProps {
  messages: {
    toFrom: string;
    text: string;
    name: string;
    image?: string;
  }[];
}

export default function ConversationContainer(
  props: ConversationContainerProps
) {
  return (
    <div id="conversation-container">
      {props?.messages
        ?.map((item, index) => (
          <div className={"chat-bubble--" + item.toFrom} key={index}>
            {item.image && <img src={item.image} alt="" />}
            <p className="chat-text">{item.text}</p>
            <p className="from-user">{item.name}</p>
          </div>
        ))
        // We are using 'flex-direction: column-reverse' and therefore we reverse the messages before render.
        .reverse()}
    </div>
  );
}
