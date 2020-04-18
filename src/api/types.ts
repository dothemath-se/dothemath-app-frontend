export type OnMessageCallback = (arg0: OnMessageCallbackData) => void;

export type OnMessageCallbackData = {
  toFrom: 'to' | 'from';
  text: string;
  name: string;
  image?: string;
};

export interface Subject {
  id: string;
  name: string;
}

export interface ReestablishSessionResult {
  name: string;
  subject: {
    id: string;
    name: string;
  };
  messages: OnMessageCallbackData[];
}
