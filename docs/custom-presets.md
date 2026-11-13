# Custom presets (idea, for later)

Let a consumer restyle the whole library with their own preset, once the library is stable (v2, for example). Not now: this note keeps the ideas.

## Where we are (2026-11-13)

- A preset is a plain object typed by `ScPreset` (`libs/presets/src/index.ts`), given at start: `provideSemanticComponents({ preset })`. The parts read it with `injectPreset()`, so nothing ties them to our eight styles.
- Tried in the blocks app: a copy of nova in `apps/blocks/src/app/blocks-nova/` (61 files, export `blocksNova`), used by `app.config.ts`. A change there (a red `frame`) showed on every card of blocks only. It works as is.
- A draft page exists in the showcase: Getting Started → Custom preset (`pages/getting-started/custom-preset-page.ts`). Hide or trim it until this is a feature.

## Ways to give a consumer their own preset

1. **Copy a folder by hand**: copy `libs/presets/<style>/src` into the app, rename the export, pass it in. What blocks does. Simple; the copy never gets our fixes.
2. **Spread one of ours**: `{ ...nova, frame: '…' }` for a few changes; the rest stays ours and updates with the package (needs that preset's `@source`).
3. **An Nx generator**: `nx g @semantic-components/presets:preset --name=my-nova --from=nova`, which writes the copy, either:
   - into a folder of an app (`--directory=src/app/my-nova`), or
   - as a library of its own in the workspace (a preset shared by several apps), with its project.json, tsconfig and index.
4. **A CLI for non-Nx apps** (like shadcn's `add`): `npx @semantic-components/cli preset my-nova --from nova`. Same output as the generator.

## TypeScript

- `ScPreset` already requires every key: a copy missing one doesn't compile. Keep it that way.
- A `definePreset(preset: ScPreset): ScPreset` helper, only to name the intent and give one place for checks later.
- For spreading: a deep partial type (`ScPresetOverrides`) and a `mergePreset(base, overrides)` that merges per part (a card's `header` without rewriting the whole `card` object). Variant functions (`cva`: button, toggle…) can't be merged by key: overriding one means giving the whole function, or exporting the variant classes as data so a merge is possible.
- Export each part's style type (`ScCardStyles`, `ScButtonVariants`…) from the public entry, documented, so a hand-written preset can type its files.

## Keeping a copy up to date

- A copy drifts: a new component adds a key (the type asks for it), a fix to an existing key doesn't show anywhere.
- Ideas: the generator records the style and version it copied from (a comment or a small json), and an `update` command shows the diff between that version and the current one, file by file. Or a changelog section "preset keys changed".

## Tailwind

- A copy in the app is scanned with the app: no `@source`.
- A preset as a workspace library or a package needs its `@source` line (like ours today); the generator could add it to `styles.css`.

## Theme vs preset

- Colors, radius and fonts are the theme's CSS variables (`styles.css`), not the preset: the docs must say which to change for what. A preset says how parts are drawn; the theme, in which colors.

## In the showcase

- `/presets` could load a custom preset (paste or upload the object?) to preview it with all the Create demos. Needs a runtime preset switch, which we don't have (a preset is fixed at start).

## Open questions

- Generator, CLI, or both? A generator only helps Nx users.
- Copy all 61 files, or only the parts the consumer wants to change (spread for the rest)?
- Should our own eight presets be written the same way a consumer's would (to dogfood the generator)?
- Name rules for a consumer preset (`my-nova`), and does it need a `ScPresetName`?
