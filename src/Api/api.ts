import io from "socket.io-client";

const socket = io("http://localhost:3000");

export function getSubjects(cb) {
  socket.emit("get_channels", cb);
}

export function sendMessage(message) {
  socket.emit("send_message", { text: message });
}

export function establishSession(channelId, studentName) {
  socket.emit("establish_session", {
    studentName,
    channelId,
  });
}

export function onMessage(cb: OnMessageCallback) {
  socket.on("message", ({ text, name, image }) =>
    cb({ toFrom: "from", name, text, image })
  );
}

type OnMessageCallback = (arg0: OnMessageCallbackData) => void;

export type OnMessageCallbackData = {
  toFrom: "to" | "from";
  text: string;
  name: string;
  image?: string;
};
