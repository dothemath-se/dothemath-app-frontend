import React from 'react';
import { UserAgreementPopupModal } from './UserAgreementPopupModal';
import { PrivacyPolicyPopupModal } from './PrivacyPolicyPopupModal';
import { CookiePolicyPopupModal } from './CookiePolicyPopupModal';

export default {
  title: 'AgreementModal',
};

export const Cookies = () => (
  <CookiePolicyPopupModal
    onCloseClick={() => console.log('Close button clicked!')}
    isOpen
  />
);

export const UserAgreement = () => (
  <UserAgreementPopupModal
    onCloseClick={() => console.log('Close button clicked!')}
    isOpen
  />
);

export const PrivacyPolicy = () => (
  <PrivacyPolicyPopupModal
    onCloseClick={() => console.log('Close button clicked!')}
    isOpen
  />
);
