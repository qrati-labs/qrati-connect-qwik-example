# Qwik example cookie-consent / GTM startup audit

- **Workflow:** Qwik example first-page startup: `CookieConsentBanner` calls `initGtm()`, performs the geo requirement lookup, then initializes vanilla-cookieconsent; user choices update Consent Mode.
- **Repository/base:** `qrati-labs/qrati-connect-qwik-example`, `main` at `b67ada21e20324817ec1815907e6eb82ab5b4f0b`.
- **Scope:** traced GTM initialization, geo lookup/cache/fail-closed handling, consent initialization/callbacks, preferences action, app mount, config and deployment asset wiring. Excluded unrelated page/theme interactions, and backend geo endpoint internals (this example only consumes `/api/cookie-consent-geo`).
- **CodeGraph:** initialized only in the selected clean checkout (`10 files, 50 nodes, 82 edges`); used `codegraph_explore` to map consent symbols/callers. The audit edit was made in a clean isolated worktree from the exact same base SHA.

## Finding

**Medium — consent was not fail-closed while geo status was unresolved.** `src/lib/cookieConsent.ts` previously queued a globally granted default for all four Consent Mode v2 signals and then a denied default limited to a list of regions. GTM startup is initiated before the asynchronous geo decision (`src/components/CookieConsentBanner.tsx:6-16`), so visitors outside that region inherited a granted state before their location/consent policy was known. Removed the granted default and the region-only restriction, replacing them with a global denied default. It stays denied until the geo result and consent choice cause an explicit update. Non-opt-in regions still receive the existing grant update after the geo decision, retaining the example's stated behavior.

Google documents that consent defaults must precede measurement and illustrates denied defaults before tags, followed by updates when the user's consent state is known.[1]

## Test quality and changes

- The base repository had no automated test files or `test` script.
- Added a Node built-in test exercising the actual `initGtm` function with a minimal browser harness, asserting exactly one denied default is queued and that the GTM script is appended after setup.
- Added `pnpm test` script; no additional test framework dependency.
- Regression test observed **RED** on the unmodified code (`2 !== 1` default commands); after the minimal code correction it passed.
- Test layers: unit only. Integration and E2E suites are absent; no claims of end-to-end browser behavior. Test harness verifies command ordering indirectly by checking dataLayer setup and script append, but does not emulate Google tag processing.

## Broader workflow notes

- Geo lookup caches the boolean per session and fails closed on fetch/parse/storage errors by requiring consent (`cookieConsent.ts:91-112`). A non-OK HTTP response also returns required without caching, which is conservative.
- Consent callbacks map analytics category state into all four signals (`cookieConsent.ts:158-168`).
- Initialization is deduplicated with a module-scoped promise. A rejected `CookieConsent.run()` leaves that promise rejected for the page lifetime; callers catch failures, but there is no retry/reset path. This is a resilience gap, not changed here because retry semantics of the CMP's partially initialized state are unclear.
- Consent geo API contract, auth/policy, persistence, retries, and rate limiting are outside this repo and were not independently validated.
- Performance: **not measured**.

## Verification

- `corepack pnpm test` — passed, 1 test.
- `corepack pnpm run build` — TypeScript phase completed, production build then failed on a pre-existing malformed CSS selector in `src/index.css` (`+.answer-section`, invalid empty selector). No unrelated CSS changes made.
- `git diff --check` — passed.
- Lint: no lint script/tool configured in package scripts.
- Coverage: not measured.

## Recommendation

Fix the existing invalid CSS selector in a separate focused change, and consider adding browser-level consent flow tests when a DOM/E2E test harness is adopted. Clarify/review the intended retry behavior if `CookieConsent.run()` rejects after partial initialization.

## PR

Pending creation. No merge or deploy performed.

## Sources

[1] https://developers.google.com/tag-platform/security/guides/consent — Set up consent mode on websites | Google for Developers