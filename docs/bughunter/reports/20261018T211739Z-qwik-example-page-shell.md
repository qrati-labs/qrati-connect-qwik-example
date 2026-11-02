# Qwik example page shell and gallery entry audit

- **Run:** `20261018T211739Z-d54931fdb3594750ba3503c50171a59c`
- **Scope:** Public Qwik example page shell: page load, embedded `<qrati-connect>` configuration, marketing content and outbound actions in `src/app.tsx`.
- **Base:** `origin/main` at `b67ada21e20324817ec1815907e6eb82ab5b4f0b`.
- **Disposition:** Report-only; no confirmed defect.

## Trace and evidence

The `App` component initializes the gallery with the configured organization ID, current theme signal, and `router="hash"`. The same page loads the Connect web-component bundle in a visible task. Theme changes update the document theme and persist the choice; the page's outbound GitHub, VS Code, npm, and Qrati links are explicit anchors. Inspection of this bounded shell did not establish a reachable failure or a violated contract. No issue was filed because no defect was confirmed.

Relevant source: `src/app.tsx` (`App`, `useVisibleTask$`, `toggleTheme`, gallery `<qrati-connect>` props, CTA and link anchors). CodeGraph was unavailable because this checkout has no `.codegraph` index; source was read directly.

## Finding

None confirmed within the stated scope. This is not a claim that every embedded gallery behavior or every link destination was validated. Runtime/network behavior, real organization settings and cross-browser behavior were not exercised.

## Tests and verification

No regression test was warranted. Tests/build/lint/type-check were not run by BugHunter. `git diff --check` is the permitted patch hygiene check.

## Timing

- Run start: 2026-10-18 21:17:39 UTC / 2026-10-19 02:47:39 IST.
- Investigation and documentation/delivery: measured from run start through completion; see final report timestamps and phase durations.
