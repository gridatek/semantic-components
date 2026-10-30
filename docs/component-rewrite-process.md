# Rewriting a component

How we rebuild a component from scratch: research what the best libraries do, build the new one next to the old one (with a `Next` suffix), compare the two, then swap the new one in under the old name. First done for the image cropper (2026-10-16).

The goal is not to port the old code: it is to keep the old component's **big idea** (what it is for, its features, its demos) and do better than before.

## 1. Look outside first

**A component shadcn has** (List 1 of the [roadmap](roadmap.md)): no web search, no downloads. Follow **Base UI** — shadcn's nova is built on it: its parts, behaviour and keyboard from Base UI (its docs in `shadcn-reference/presets/nova/node_modules/@base-ui/react/docs`), its look from shadcn's generated reference app. The steps below are for the components shadcn doesn't have.

1. **Who is used the most.** Weekly npm downloads of the main packages (React, Angular, Vue, framework-agnostic), with a small script in the scratchpad:

   ```js
   const names = ['react-easy-crop', 'react-image-crop', 'cropperjs', 'ngx-image-cropper'];
   for (const name of names) {
     const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`);
     console.log((await res.json()).downloads, name);
   }
   ```

2. **What the best ones do.** Search the web for the top ones: their features, their interaction model, their API shape, and their accessibility (keyboard, screen readers) — usually the weakest point, and where we can do better.
3. **Write down what to take from each** — features and layout, never their CSS (the look stays the library's).

## 2. Read the old component — for its idea only

- Its parts, inputs and outputs, its README, its demos and its tests: what it is for and what it can do.
- Not its code: the new one is written from scratch.
- Note what is wrong with it today (flaky tests, external assets, missing keyboard support, own button styles, `Date`…).

## 3. Design note — validated before any code

A short note in the conversation (no code yet):

- **What it takes from whom** (from step 1).
- **The parts**: names, selectors, what each does; what the consumer writes (all markup, text, icons, names).
- **The state**: models and inputs — one way to do each thing.
- **Keyboard and screen readers.**
- **Output** (files, data) and what is left out on purpose.

Wait for a yes.

## 4. Build it next to the old one: `Next`

The new component lives beside the old one until the switch, so both can be compared:

| What           | Old                     | New, until the switch        |
| -------------- | ----------------------- | ---------------------------- |
| Library folder | `components/foo/`       | `components/foo-next/`       |
| Classes        | `ScFoo…`                | `ScFooNext…`                 |
| Selectors      | `[scFoo…]`              | `[scFooNext…]`               |
| Docs page      | `/docs/components/foo`  | `/docs/components/foo-next`  |
| Demos          | `pages/docs/foo/demos/` | `pages/docs/foo-next/demos/` |
| Tests          | `src/demos/foo/`        | `src/demos/foo-next/`        |

Build it to the project's rules (`.claude/CLAUDE.md`, memory):

- Parts are directives on the consumer's elements; one per file; `classInput` + `cn()` on each.
- The consumer writes markup, text, icons and accessible names — no default strings; icon buttons named with `sr-only` text.
- Button parts style themselves with the preset's button, `injectPreset().button(…)` (`docs/button-parts-styling.md`).
- Signals, `model()` for two-way state, `computed()` for the rest; Signal Forms only.
- Web platform APIs as globals: `Temporal`, never `Date` (`project-future-browsers` memory).
- Axe and WCAG AA from the start: keyboard, focus, names, contrast.
- **Local assets** in demos (`apps/showcase/public/images/`), never a remote URL — remote images made tests flaky.

Wire it into the showcase:

- Export it from the library's `components/index.ts`.
- A docs page, its route in `routes/components-routes.ts`, its demos' routes in `routes/demos-routes.ts`.
- A demo container per demo, with `demoUrl`; then `node scripts/sync-demo-code.mjs` (never write `readonly code` by hand).
- An entry in `apps/showcase/public/components.json` (`Experimental`).
- A README in the component's folder.

## 5. Check it

- Type-checks: `npx ngc -p libs/<lib>/tsconfig.lib.json --noEmit`, `npx ngc -p apps/showcase/tsconfig.app.json --noEmit`, `npx tsc -p apps/showcase-e2e/tsconfig.json --noEmit`.
- Lint: `npx nx run-many -t lint -p <lib> showcase showcase-e2e --skip-nx-cache --output-style=static`.
- E2E specs for its demos (one spec per behaviour: keyboard, gestures, output…) and the page's axe test — **only these specs** locally, never the whole suite:

  ```sh
  cd apps/showcase-e2e
  npx playwright test src/demos/foo-next/ src/pages/foo-next-page.spec.ts --project=chromium --reporter=line --retries=0 --workers=1
  ```

  For Firefox or WebKit: `ALL_BROWSERS=1 … --project=firefox`.

- **Look at it in a browser**: screenshots of each demo with Playwright (in the scratchpad), and drive the interactions the tests don't cover. Fix what looks wrong before showing it.
- No build (`nx build`): the dev server shows changes live.

## 6. Compare and validate

- Both pages are in the showcase: the old one and **Foo Next**.
- Give a short comparison (a table: old vs next), and say what was left out and what could not be tested (e.g. pinch without a touch screen).
- Iterate on feedback — the look, a demo, a missing feature — until it is validated. Feedback on the look can mean taking the old one's (the cropper kept its handles and outline).

## 7. Switch — when validated

1. **Delete the old one**: its library folder, its export, its docs page and demos, their routes, its e2e specs and page test, its `components.json` entry.
2. **Rename `Next` away** everywhere: folder `foo-next` → `foo`, files `foo-next-*.ts` → `foo-*.ts`, classes `ScFooNext…` → `ScFoo…`, selectors `scFooNext…` → `scFoo…`, `exportAs`, demo names, routes (`/docs/components/foo`, `/demos/foo/…`), the page title, `components.json`, the README and the tests. Grep for `Next`/`next` afterwards: nothing of the component should be left.
3. Sync the demo code, prettier on the changed files.
4. Check again (step 5) under the final names.
5. Update what refers to it: other READMEs, docs in `docs/`, `.claude/CLAUDE.md` if a rule names it.
6. Report: what changed, the breaking changes (pre-release: no aliases or shims), what could not be checked. The user commits.

## Checklist

- [ ] npm downloads and the best libraries' features
- [ ] The old one's idea (not its code)
- [ ] Design note — validated
- [ ] `Next` built beside the old one, to the rules, with local assets
- [ ] Docs page, routes, containers, demo sync, `components.json`, README
- [ ] Type-checks, lint, its specs, its page's axe test, screenshots
- [ ] Compared and validated
- [ ] Old one deleted, `Next` renamed away, checked again
- [ ] Report
