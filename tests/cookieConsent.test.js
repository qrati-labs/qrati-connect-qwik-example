import test from 'node:test';
import assert from 'node:assert/strict';

const consent = await import('../src/lib/cookieConsent.ts');

function installBrowser() {
  const appended = [];
  globalThis.window = {
    dataLayer: [],
    location: { hostname: 'example.test' },
  };
  globalThis.document = {
    getElementById: () => null,
    createElement: () => ({}),
    head: { appendChild: (element) => appended.push(element) },
  };
  return appended;
}

test('GTM starts with denied consent defaults before the script is appended', () => {
  const scripts = installBrowser();

  consent.initGtm('GTM-TEST');

  const consentDefaults = window.dataLayer.filter(
    (entry) => entry[0] === 'consent' && entry[1] === 'default',
  );
  assert.equal(consentDefaults.length, 1);
  assert.deepEqual(consentDefaults[0][2], {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].id, 'gtm-script');
});
