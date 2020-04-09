import io from "socket.io-client";

const socket = io("https://api.dothemath.app");

export function getSubjects(cb) {
  socket.emit("get_channels", cb);
}

export function sendMessage(text: string, image?: File | null) {
  if (image) {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const arrayBuffer = this.result as ArrayBuffer;
      socket.emit("send_message", { text, image: arrayBuffer });
    }
    fileReader.readAsArrayBuffer(image);
  } else {
    socket.emit("send_message", { text });
  }
}

export function establishSession(channelId, studentName) {
  socket.emit("establish_session", {
    studentName,
    channelId,
  });
}

export function onMessage(cb: OnMessageCallback) {
  socket.on("message", ({ text, name, image }) => {
    if (image) {
      cb({ toFrom: 'from', name, text: '', image });
    }
    if (text) {
      cb({ toFrom: "from", name, text })
    }
  });
}

type OnMessageCallback = (arg0: OnMessageCallbackData) => void;

export type OnMessageCallbackData = {
  toFrom: "to" | "from";
  text: string;
  name: string;
  image?: string | null;
};
