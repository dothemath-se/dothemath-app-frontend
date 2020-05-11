import React from 'react';
import { AgreementModal } from './AgreementModal';

export default {
  title: 'AgreementModal',
};

export const Cookies = () => (
  <AgreementModal
    type="cookies"
    onCloseClick={() => console.log('Close button clicked!')}
  />
);

export const UserAgreement = () => (
  <AgreementModal
    type="user"
    onCloseClick={() => console.log('Close button clicked!')}
  />
);

export const PrivacyPolicy = () => (
  <AgreementModal
    type="privacy"
    onCloseClick={() => console.log('Close button clicked!')}
  />
);
