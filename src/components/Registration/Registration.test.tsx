import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';

import { Registration } from './Registration';

const type = userEvent.type;
const click = userEvent.click;

describe('registration', () => {
  it('button is initially disabled', () => {
    const r = myRender(<Registration onComplete={() => {}} disableCaptcha />);

    expect(r.BörjaButton).toBeDisabled();
  });

  it('filling out form enables button', () => {
    const r = myRender(<Registration onComplete={() => {}} disableCaptcha />);

    type(r.Smeknamn, 'nisse');
    click(r.CookiesCheckbox);
    click(r.ServiceCheckbox);

    expect(r.BörjaButton).toBeEnabled();
  });

  it('captcha disables button', () => {
    const r = myRender(<Registration onComplete={() => {}} />);

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
