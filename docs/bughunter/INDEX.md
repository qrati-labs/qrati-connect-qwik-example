# BugHunter Audit Index

| UTC timestamp | Workflow | Repository / base SHA | Outcome / severity | Tests and coverage | Research | PR / blocker |
|---|---|---|---|---|---|---|
| 2026-10-15T22:48Z | Qwik example cookie-consent and GTM startup | qrati-connect-qwik-example / `b67ada21e20324817ec1815907e6eb82ab5b4f0b` | Fixed one Medium issue: globally denied GTM consent until geo decision | Added Node unit regression test; RED then GREEN, 1 passing. Coverage not measured; integration/E2E absent. Build blocked by pre-existing `+.answer-section` CSS selector. | [Google Consent Mode guidance](https://developers.google.com/tag-platform/security/guides/consent) | [PR #1](https://github.com/qrati-labs/qrati-connect-qwik-example/pull/1); Cloudflare check pending at last read |
