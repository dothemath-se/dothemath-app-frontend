import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';

import { ProfilePage } from '.';

const click = userEvent.click;

describe('ProfilePage', () => {
  it('should show default avatar', () => {
    // test 1
    // kolla att defaultbilden visas

    const r = myRender(<ProfilePage name="" />);

    expect(r.utils.getByAltText(/avatar/i)).toBeVisible();
  });

  test('show popup', async () => {
    // test 2
    // klicka på default bilden
    // kolla att popup visas
    // klicka på en annan avatar
    // kolla att rutan stängs
    // kolla att ny avatar visas

    const r = myRender(<ProfilePage name="" />);

    click(r.Avtar);

    // expect((await r.utils.findAllByRole('img')).length).toBe(16);

    expect(r.Avtar).toBeVisible();
    console.log((await r.AllAvatars).length);
    console.log((await r.utils.findAllByRole('img')).length);
  });
});

const myRender = (ui: ReactElement) => {
  var utils = render(ui);
  return {
    Avtar: utils.getByAltText(/avatar/i),
    AllAvatars: utils.findAllByAltText(/avatar/i),
    utils,
    // Smeknamn: utils.getByPlaceholderText(/smeknamn/i),
    // CookiesCheckbox: utils.getByAltText(/cookies checkbox/i),
    // BörjaButton: utils.getByRole('button', { name: /börja/i }),
  };
};
