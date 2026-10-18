# BugHunter report — Qwik example icon paths under subpath

- Run: `20261018T185838Z-bd8d23529fa244eea784ab5b842d47dc`
- Scope: deployed Qwik example PNG favicon and Apple touch icon URLs.
- Base: `origin/main` `b67ada21e20324817ec1815907e6eb82ab5b4f0b`.
- Finding: **[P2] PNG icons bypass the Qwik subpath deployment.**
- Evidence: `index.html:46-47` used `/qrati-connect-logo-square.png`; browsers resolve this at the domain root. `src/worker.ts:13-21` only routes `/connect/qwik-example` requests to this app's asset binding, so the icon requests do not reach the asset. The app is documented as deployed at `/connect/qwik-example/` in `README.md:52`; JSON-LD already uses the subpath for the same image at `index.html:121`.
- Impact: browser-tab PNG favicon and Apple home-screen icon can fail to load on the deployed example.
- Root cause: root-relative asset paths do not include the example's deployment prefix.
- Issue: https://github.com/qrati-labs/qrati-connect-qwik-example/issues/8
- Fix: qualify both icon hrefs with `/connect/qwik-example/`.
- Regression test authored: `tests/icon-paths.test.js` checks both links. Intended command: `node --test tests/icon-paths.test.js` (**NOT RUN BY BUGHUNTER**).
- Verification: `git diff --check` passed. No tests/build/lint/type-check/install were run. CI status is pending PR creation/readback.
- Limitations: this audit only covers these two icon links; no live deployed HTTP request was made.
- Timing: start `2026-10-18T18:58:38Z` (2026-10-19 00:28:38 IST); end `2026-10-18T19:00:46Z` (2026-10-19 00:30:46 IST); total `00:02:08` (preflight `00:00:22`, already measured by pre-run script). Other phase durations were not separately instrumented and are not estimated.
