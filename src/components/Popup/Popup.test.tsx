import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';

import { Popup } from './Popup';

const type = userEvent.type;
const click = userEvent.click;

describe('Popup', () => {
  test('button is initially disabled', () => {
    const r = myRender(<Popup onComplete={() => {}} disableCaptcha />);

    expect(r.BörjaButton).toBeDisabled();
  });

  test('filling out form enables button', () => {
    const r = myRender(<Popup onComplete={() => {}} disableCaptcha />);

    type(r.Smeknamn, 'nisse');
    click(r.CookiesCheckbox);
    click(r.ServiceCheckbox);

    expect(r.BörjaButton).toBeEnabled();
  });

  test('captcha disables button', () => {
    const r = myRender(<Popup onComplete={() => {}} />);

    type(r.Smeknamn, 'nisse');
    click(r.CookiesCheckbox);
    click(r.ServiceCheckbox);

    expect(r.BörjaButton).toBeDisabled();
  });
});

const myRender = (ui: ReactElement) => {
  var utils = render(ui);
  return {
    Smeknamn: utils.getByLabelText(/smeknamn/i),
    CookiesCheckbox: utils.getByRole('checkbox', { name: /cookies/i }),
    ServiceCheckbox: utils.getByRole('checkbox', {
      name: /användarvillkoren/i,
    }),
    BörjaButton: utils.getByRole('button', { name: /börja/i }),
  };
};
