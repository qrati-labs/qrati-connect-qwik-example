import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { checkConsentRequired, ensureCookieConsentInitialized } from '../lib/cookieConsent';

export const CookieConsentBanner = component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    try {
      const required = await checkConsentRequired();
      if (required) {
        await ensureCookieConsentInitialized(true);
      } else {
        await ensureCookieConsentInitialized(false);
      }
    } catch {
      await ensureCookieConsentInitialized(true);
    }
  });

  return null;
});

export default CookieConsentBanner;
