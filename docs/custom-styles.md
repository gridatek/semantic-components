# Custom styles (idea, for later)

Let a consumer restyle the whole library with their own style, once the library is stable (v2, for example). Not now: this note keeps the ideas.

## Where we are (2026-11-13)

- A style is a plain object typed by `ScStyle` (`libs/styles/src/index.ts`), given at start: `provideSemanticComponents({ style })`. The parts read it with `injectStyle()`, so nothing ties them to our eight styles.
- Tried in an app: the custom app (`apps/styles/custom`) holds a copy of nova in `src/app/custom-style/` (export `customStyle`), used by its `app.config.ts` and kept in step with nova by `scripts/sync-custom-style.mjs`. A change there (a red `frame`, tried in the former blocks app) shows in that app only. It works as is.
- A draft page exists in the showcase: Getting Started → Custom style (`pages/getting-started/custom-style-page.ts`). Hide or trim it until this is a feature.

## Ways to give a consumer their own style

1. **Copy a folder by hand**: copy `libs/styles/<style>/src` into the app, rename the export, pass it in. What blocks does. Simple; the copy never gets our fixes.
2. **Spread one of ours**: `{ ...nova, frame: '…' }` for a few changes; the rest stays ours and updates with the package (needs that style's `@source`).
3. **An Nx generator**: `nx g @semantic-components/styles:preset --name=my-nova --from=nova`, which writes the copy, either:
   - into a folder of an app (`--directory=src/app/my-nova`), or
   - as a library of its own in the workspace (a style shared by several apps), with its project.json, tsconfig and index.
4. **A CLI for non-Nx apps** (like shadcn's `add`): `npx @semantic-components/cli preset my-nova --from nova`. Same output as the generator.

## TypeScript

- `ScStyle` already requires every key: a copy missing one doesn't compile. Keep it that way.
- A `defineStyle(style: ScStyle): ScStyle` helper, only to name the intent and give one place for checks later.
- For spreading: a deep partial type (`ScStyleOverrides`) and a `mergeStyle(base, overrides)` that merges per part (a card's `header` without rewriting the whole `card` object). Variant functions (`cva`: button, toggle…) can't be merged by key: overriding one means giving the whole function, or exporting the variant classes as data so a merge is possible.
- Export each part's style type (`ScCardStyles`, `ScButtonVariants`…) from the public entry, documented, so a hand-written style can type its files.

## Keeping a copy up to date

- A copy drifts: a new component adds a key (the type asks for it), a fix to an existing key doesn't show anywhere.
- Ideas: the generator records the style and version it copied from (a comment or a small json), and an `update` command shows the diff between that version and the current one, file by file. Or a changelog section "style keys changed".

## Tailwind

- A copy in the app is scanned with the app: no `@source`.
- A style as a workspace library or a package needs its `@source` line (like ours today); the generator could add it to `styles.css`.

## Theme vs style

- Colors, radius and fonts are the theme's CSS variables (`styles.css`), not the style: the docs must say which to change for what. A style says how parts are drawn; the theme, in which colors.

## Styles are fixed at start (decided, 2026-11-13)

- An app picks its style once, when it starts; it doesn't change it while running. A runtime switch is not planned: no app needs it, and offering several styles would grow the app's JavaScript and CSS (every style's classes generated).
- Only our showcase switches (on /customize): it saves the name in a cookie and reloads — enough there.
- Why it needs the reload: each part reads its classes once, when it is created (`private readonly styles = injectStyle().card`). Switching live would mean the style as a signal and every part reading it in its `computed()`: about a hundred parts. Cheap at run time, but not worth it for the showcase alone.
- So a consumer's own style is previewed in their own app, not on /customize (an object with functions — the `cva` variants — can't be saved in a cookie and rebuilt after a reload).

## Open questions

- Generator, CLI, or both? A generator only helps Nx users.
- Copy all 61 files, or only the parts the consumer wants to change (spread for the rest)?
- Should our own eight styles be written the same way a consumer's would (to dogfood the generator)?
- Name rules for a consumer style (`my-nova`), and does it need a `ScStyleName`?
