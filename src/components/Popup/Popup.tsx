import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button } from '../Button';
import {
  CookiePolicyPopupModal,
  PrivacyPolicyPopupModal,
  UserAgreementPopupModal,
} from '../PopupModal';

interface PopupProps {
  disableCaptcha?: boolean;
  onComplete: (arg0: string) => void;
}

export const Popup = (props: PopupProps) => {
  const [nickname, setNickname] = useState('');
  const [acceptCookies, setAcceptCookies] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passCaptcha, setPassCaptcha] = useState(false);
  const [cookiePolicyModalOpen, setCookiePolicyModalOpen] = useState(false);
  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [userAgreementModalOpen, setUserAgreementModalOpen] = useState(false);

  const formIsValid =
    !!nickname &&
    acceptCookies &&
    acceptTerms &&
    (passCaptcha || !!props.disableCaptcha);

  return (
    <div id="popup">
      <div id="popup-container">
        <h3>Innan vi börjar...</h3>
        <form id="name-form" onSubmit={(e) => e.preventDefault()}>
          <input
            id="name-input"
            maxLength={25}
            type="text"
            placeholder="Välj ett smeknamn"
            onChange={(e) => setNickname(e.target.value.trim())}
          />
          <div id="checks-container">
            <img // eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              alt="accept cookies checkbox"
              src={
                !acceptCookies
                  ? 'icons/square-regular.svg'
                  : 'icons/check-square-solid.svg'
              }
              onClick={() => setAcceptCookies((x) => !x)}
              className="toggle-check"
            />
            <span>
              Jag förstår och accepterar att{' '}
              <Button link onClick={() => setCookiePolicyModalOpen(true)}>
                Cookies
              </Button>{' '}
              används på den här webbplatsen
            </span>
            <img // eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              alt="accept terms of service checkbox"
              src={
                !acceptTerms
                  ? 'icons/square-regular.svg'
                  : 'icons/check-square-solid.svg'
              }
              onClick={() => setAcceptTerms((x) => !x)}
              className="toggle-check"
            />
            <span>
              Jag har läst och accepterar{' '}
              <Button link onClick={() => setUserAgreementModalOpen(true)}>
                Användarvillkoren
              </Button>{' '}
              och{' '}
              <Button link onClick={() => setPrivacyPolicyModalOpen(true)}>
                Integritetspolicyn
              </Button>
            </span>
          </div>
          {!props.disableCaptcha && (
            <ReCAPTCHA
              sitekey="6LdJiugUAAAAABme_rVvdcwmRAyQ0f8Fq7nMubcO"
              onChange={(value) => setPassCaptcha(!!value)}
              // @ts-ignore
              style={{ marginBottom: '1rem' }}
            />
          )}
          <Button
            primary
            onClick={() => props.onComplete(nickname)}
            disabled={!formIsValid}
          >
            Börja
          </Button>
        </form>
      </div>

      <CookiePolicyPopupModal
        onCloseClick={() => setCookiePolicyModalOpen(false)}
        isOpen={cookiePolicyModalOpen}
      />

      <UserAgreementPopupModal
        onCloseClick={() => setUserAgreementModalOpen(false)}
        isOpen={userAgreementModalOpen}
      />

      <PrivacyPolicyPopupModal
        onCloseClick={() => setPrivacyPolicyModalOpen(false)}
        isOpen={privacyPolicyModalOpen}
      />
    </div>
  );
};
