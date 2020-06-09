import React from 'react';

import { Registration } from './Registration';

export default {
  title: 'Registration',
};

export const Default = () => (
  <Registration onComplete={() => {}} disableCaptcha />
);
