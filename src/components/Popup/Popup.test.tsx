import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popup } from './Popup';

const type = userEvent.type;
const click = userEvent.click;

describe('Popup', () => {
  test('button is initially disabled', () => {
    const r = myRender(<Popup onComplete={() => {}} useCaptcha={false} />);

    expect(r.BörjaButton).toBeDisabled();
  });

  test('filling out form enables button', () => {
    const r = myRender(<Popup onComplete={() => {}} useCaptcha={false} />);

    type(r.Smeknamn, 'nisse');
    click(r.CookiesCheckbox);
    click(r.ServiceCheckbox);

    expect(r.BörjaButton).toBeEnabled();
  });

  test('captcha disables button', () => {
    const r = myRender(<Popup onComplete={() => {}} useCaptcha={true} />);

    type(r.Smeknamn, 'nisse');
    click(r.CookiesCheckbox);
    click(r.ServiceCheckbox);

    expect(r.BörjaButton).toBeDisabled();
  });
});

const myRender = (ui: ReactElement) => {
  var utils = render(ui);
  return {
    Smeknamn: utils.getByPlaceholderText(/smeknamn/i),
    ServiceCheckbox: utils.getByAltText(/service checkbox/i),
    CookiesCheckbox: utils.getByAltText(/cookies checkbox/i),
    BörjaButton: utils.getByRole('button', { name: /börja/i }),
  };
};
