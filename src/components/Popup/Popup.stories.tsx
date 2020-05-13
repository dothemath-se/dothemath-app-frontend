import React from 'react';
import { Popup } from './Popup';

export default {
  title: 'Popup',
};

export const Default = () => <Popup onComplete={() => {}} useCaptcha={false} />;
