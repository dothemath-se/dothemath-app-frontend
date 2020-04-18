import io from 'socket.io-client';

export const socket = io('https://api.dothemath.app');

export { cancelSession } from './cancelSession';
export { establishSession } from './establishSession';
export { getSubjects } from './getSubjects';
export { onMessage } from './onMessage';
export { reestablishSession } from './reestablishSession';
export { sendMessage } from './sendMessage';

export type { OnMessageCallback } from './types';
export type { OnMessageCallbackData } from './types';
// export type { ReestablishSessionResult } from './types';
export type { Subject } from './types';
