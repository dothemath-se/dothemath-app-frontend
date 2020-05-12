import React from 'react';
import {
  CookiePolicyModal,
  UserAgreementModal,
  PrivacyPolicyModal,
} from './AgreementModal';

export default {
  title: 'AgreementModal',
};

export const Cookies = () => (
  <CookiePolicyModal
    onCloseClick={() => console.log('Close button clicked!')}
    isOpen
  />
);

export const UserAgreement = () => (
  <UserAgreementModal
    onCloseClick={() => console.log('Close button clicked!')}
    isOpen
  />
);

export const PrivacyPolicy = () => (
  <PrivacyPolicyModal
    onCloseClick={() => console.log('Close button clicked!')}
    isOpen
  />
);
