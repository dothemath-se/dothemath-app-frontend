import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { AgreementModal } from '../AgreementModal';

interface PopupProps {
  onComplete: (arg0: string) => void;
}

export const Popup = (props: PopupProps) => {
  const [nickname, setNickname] = useState('');
  const [acceptCookies, setAcceptCookies] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passCaptcha, setPassCaptcha] = useState(false);
  const [agreementModal, setAgreementModal] = useState<
    '' | 'cookies' | 'user' | 'privacy'
  >('');

  return (
    <div id="popup">
      <div id="popup-container">
        <h3>Before we begin...</h3>
        <form id="name-form">
          <input
            id="name-input"
            maxLength={25}
            type="text"
            placeholder="Choose your nickname"
            onChange={(e) => setNickname(e.target.value.trim())}
          />
          <div id="checks-container">
            <img
              alt=""
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
              <a href="#" onClick={() => setAgreementModal('cookies')}>
                Cookies
              </a>{' '}
              används på den här webbplatsen
            </span>
            <img
              alt=""
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
              <a href="#" onClick={() => setAgreementModal('user')}>
                Användarvillkoren
              </a>{' '}
              och{' '}
              <a href="#" onClick={() => setAgreementModal('privacy')}>
                Integritetspolicyn
              </a>
            </span>
          </div>
          <ReCAPTCHA
            sitekey="6LdJiugUAAAAABme_rVvdcwmRAyQ0f8Fq7nMubcO"
            onChange={setPassCaptcha}
            style={{ marginBottom: '1rem' }}
          />
          <button
            id="enter-name-btn"
            className="btn--primary"
            type="button"
            onClick={() => props.onComplete(nickname)}
            disabled={
              !(nickname && acceptCookies && acceptTerms && passCaptcha)
            }
          >
            Begin
          </button>
        </form>
      </div>

      {agreementModal && (
        <AgreementModal
          type={agreementModal}
          onCloseClick={() => setAgreementModal('')}
        />
      )}
    </div>
  );
};
