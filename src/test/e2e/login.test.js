import Nightmare from 'nightmare';
const nightmare = Nightmare();

import helper from './helper';

describe('when user tries to log in', () => {
  const homepageUrl = helper.url('/');

  test('it shows the FB log in window', async () => {
    let loginWindowOpened;

    let page = nightmare.on('new-window', () => {
      loginWindowOpened = true
    }).goto(homepageUrl).click('button');

    let text = await page.evaluate(() => document.body.textContent).end();

    expect(loginWindowOpened).toBeTruthy();
  });
});
