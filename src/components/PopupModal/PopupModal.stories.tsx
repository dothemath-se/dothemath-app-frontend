import React from 'react';

import { CookiePolicyPopupModal } from './CookiePolicyPopupModal';
import { PrivacyPolicyPopupModal } from './PrivacyPolicyPopupModal';
import { UserAgreementPopupModal } from './UserAgreementPopupModal';

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
