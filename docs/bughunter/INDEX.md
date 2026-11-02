# BugHunter reports

| Date (UTC) | Workflow | Result |
|---|---|---|
| 2026-10-18 | Qwik example PNG icons under subpath deployment | [P2 fixed; issue #8](reports/20261018T185838Z-qwik-subpath-icons.md) |
- [2026-10-18 — Qwik example page shell and gallery entry](reports/20261018T211739Z-qwik-example-page-shell.md) — bounded report-only audit; no confirmed defect.
| Date (UTC) | Workflow | Disposition | Report |
| --- | --- | --- | --- |
| 2026-10-18 | Qwik example FAQ disclosures | Report-only; no confirmed defect | [20261018T205038Z-qwik-faq-disclosures.md](reports/20261018T205038Z-qwik-faq-disclosures.md) |
- [2026-10-18 — Qwik example organization configuration](reports/20261018T180638Z-qwik-organization-config.md) — report-only; no user-impacting defect confirmed.
- [20261017T173339Z — Qwik host theme storage failure](reports/20261017T173339Z-qwik-theme-storage.md) — identified unguarded localStorage access that can abort gallery bootstrap.
- [2026-10-17T22:08Z — Qwik cookie-consent banner initialization](reports/2026-10-17T22-08Z-qwik-consent-banner.md) — traced geo decision, consent initialization, GTM setup, and preferences action; no additional confirmed defect.
- [20261018T120239Z — Qwik application bootstrap](reports/20261018T120239Z-qwik-application-bootstrap.md) — traced HTML module entry through Qwik mounting; no confirmed defect.
- [20261018T123039Z — Qwik host theme toggle](reports/20261018T123039Z-qwik-theme-toggle.md) — traced theme selection, toggle, persistence, and web-component propagation; no additional confirmed defect.
# BugHunter Reports

- [2026-10-17 — Qwik example worker routing](reports/2026-10-17T093648Z-qwik-worker-routing.md) — report-only; no confirmed defect.
# BugHunter Audit Index

| UTC timestamp | Workflow | Repository / base SHA | Outcome / severity | Tests and coverage | Research | PR / blocker |
|---|---|---|---|---|---|---|
| 2026-10-15T22:48Z | Qwik example cookie-consent and GTM startup | qrati-connect-qwik-example / `b67ada21e20324817ec1815907e6eb82ab5b4f0b` | Fixed one Medium issue: globally denied GTM consent until geo decision | Added Node unit regression test; RED then GREEN, 1 passing. Coverage not measured; integration/E2E absent. Build blocked by pre-existing `+.answer-section` CSS selector. | [Google Consent Mode guidance](https://developers.google.com/tag-platform/security/guides/consent) | [PR #1](https://github.com/qrati-labs/qrati-connect-qwik-example/pull/1); Cloudflare check pending at last read |
