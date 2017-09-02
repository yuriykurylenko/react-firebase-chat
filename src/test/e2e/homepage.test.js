import Nightmare from 'nightmare';
const nightmare = Nightmare();

import helper from './helper';

describe('whan user visits the homepage', () => {
  const homepageUrl = helper.url('/');

  test('it shows the log in button', async () => {
    let page = nightmare.goto(homepageUrl);
    let text = await page.evaluate(() => document.body.textContent).end();

    expect(text).toContain('Log in with Facebook');
  });
});
