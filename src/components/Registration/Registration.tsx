import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { getConfig } from '../../getConfig';
import { Button } from '../Button';
import {
  CookiePolicyPopupModal,
  PrivacyPolicyPopupModal,
  UserAgreementPopupModal,
} from '../PopupModal';
import styles from './Registration.module.sass';

const RECAPTCHA_SITEKEY = getConfig().VITE_RECAPTCHA_SITEKEY;

interface RegistrationProps {
  disableCaptcha?: boolean;
  onComplete: (arg0: string) => void;
}

export const Registration = (props: RegistrationProps) => {
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
    <div className="popup">
      <div
        className={`${styles['registration-container']} registration-and-subjects-container`}
      >
        <h3>Innan vi börjar...</h3>
        <form
          className={styles['name-form']}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            maxLength={25}
            type="text"
            placeholder="Välj ett smeknamn"
            aria-label="Välj ett smeknamn"
            onChange={(e) => setNickname(e.target.value.trim())}
          />
          <div className={styles['checks-container']}>
            <label htmlFor="acceptCookies">
              <input
                type="checkbox"
                id="acceptCookies"
                onClick={() => setAcceptCookies((x) => !x)}
              />
              <span>
                Jag förstår och accepterar att{' '}
                <Button link onClick={() => setCookiePolicyModalOpen(true)}>
                  Cookies
                </Button>{' '}
                används på den här webbplatsen
              </span>
            </label>
            <label htmlFor="acceptTerms">
              <input
                type="checkbox"
                id="acceptTerms"
                onClick={() => setAcceptTerms((x) => !x)}
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
            </label>
          </div>
          {!props.disableCaptcha && (
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITEKEY}
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
