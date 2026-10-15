# To do: name icon buttons with visually hidden text

Status: **to do** — 348 buttons in 119 files (counted 2026-10-15).

## The rule

An icon-only button is named by visually hidden text inside it, not by `aria-label`:

```html
<!-- Not this -->
<button scToastClose aria-label="Close">
  <svg siXIcon></svg>
</button>

<!-- This -->
<button scToastClose>
  <svg siXIcon></svg>
  <span class="sr-only">Close</span>
</button>
```

A name that changes moves into the span too: `<span class="sr-only">{{ player.isPlaying() ? 'Pause' : 'Play' }}</span>`.

`aria-label` stays where it belongs:

- elements that are not buttons and need a name — sliders, inputs, regions, groups, lists, `nav`;
- a button with visible text that needs a fuller name (the pagination's "Previous" named "Go to previous page").

## How to convert

The change is mechanical, for a `<button>` whose content has no text (only icons and control flow):

1. take its `aria-label="X"` — or `[attr.aria-label]="expr"` — off the button;
2. add `<span class="sr-only">X</span>` (or `{{ expr }}`) as its last child;
3. leave buttons that already have `sr-only` text, or visible text, as they are.

Then run `node scripts/sync-demo-code.mjs` (the demo containers' code) and prettier.

Screen readers hear the same names, so tests that look buttons up by name (`getByRole('button', { name })`) keep working. Tests that read the attribute itself break — 13 `toHaveAttribute('aria-label', …)` in:

- `apps/showcase-e2e/src/demos/emoji-picker/basic-emoji-picker-demo.spec.ts`
- `apps/showcase-e2e/src/demos/lightbox/keyboard-lightbox-demo.spec.ts`
- `apps/showcase-e2e/src/demos/pagination/` — basic, ellipsis, first-page, keyboard-navigation, last-page
- `apps/showcase-e2e/src/demos/tour-guide/full-tour-guide-demo.spec.ts`

Check each one: the pagination ones are about buttons with visible text, which keep their `aria-label`; the others should assert the accessible name instead (`toHaveAccessibleName`).

## Where

### Showcase demos (252)

- 43 — `apps/showcase/src/app/pages/docs/pdf-viewer/demos/pdf-viewer-demo.ts`
- 16 — `apps/showcase/src/app/pages/docs/speed-dial/demos/directions-speed-dial-demo.ts`
- 12 — `apps/showcase/src/app/pages/docs/speed-dial/demos/sizes-speed-dial-demo.ts`
- 7 — `apps/showcase/src/app/pages/docs/audio-player/demos/audio-player-demo.ts`
- 7 — `apps/showcase/src/app/pages/docs/video-player/demos/video-player-demo.ts`
- 6 — `apps/showcase/src/app/pages/docs/image-cropper/demos/full-featured-cropper-demo.ts`
- 6 — `apps/showcase/src/app/pages/docs/signature-pad/demos/colors-signature-pad-demo.ts`
- 6 — `apps/showcase/src/app/pages/docs/signature-pad/demos/thick-pen-signature-pad-demo.ts`
- 6 — `apps/showcase/src/app/pages/docs/toolbar/demos/basic-toolbar-demo.ts`
- 5 — `apps/showcase/src/app/pages/docs/data-table/demos/featured-data-table-demo.ts`
- 5 — `apps/showcase/src/app/pages/docs/speed-dial/demos/basic-speed-dial-demo.ts`
- 5 — `apps/showcase/src/app/pages/docs/speed-dial/demos/custom-icons-speed-dial-demo.ts`
- 5 — `apps/showcase/src/app/pages/docs/speed-dial/demos/disabled-actions-speed-dial-demo.ts`
- 5 — `apps/showcase/src/app/pages/docs/speed-dial/demos/without-labels-speed-dial-demo.ts`
- 4 — `apps/showcase/src/app/pages/docs/toggle/demos/toolbar-toggle-demo.ts`
- 4 — `apps/showcase/src/app/pages/docs/transfer-list/demos/basic-transfer-list-demo.ts`
- 4 — `apps/showcase/src/app/pages/docs/transfer-list/demos/no-search-transfer-list-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/kanban-board/demos/basic-kanban-board-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/lightbox/demos/basic-lightbox-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/lightbox/demos/gallery-lightbox-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/lightbox/demos/info-lightbox-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/lightbox/demos/keyboard-lightbox-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/lightbox/demos/no-loop-lightbox-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/lightbox/demos/no-thumbnails-lightbox-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/notification-center/demos/by-day-notification-center-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/toggle/demos/sizes-toggle-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/toggle-group/demos/multiple-toggle-group-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/toggle-group/demos/outline-toggle-group-demo.ts`
- 3 — `apps/showcase/src/app/pages/docs/toggle-group/demos/single-toggle-group-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/barcode-scanner/demos/basic-barcode-scanner-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/button-group/demos/button-group-input-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/button-group/demos/button-group-orientation-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/drawer/demos/basic-drawer-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/image-cropper/demos/avatar-cropper-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/pdf-viewer/demos/pdf-viewer-form-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/pdf-viewer/demos/pdf-viewer-reading-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/sidebar/demos/basic-sidebar-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/sidebar/demos/icon-sidebar-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/signature-pad/demos/basic-signature-pad-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/signature-pad/demos/composable-signature-pad-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/signature-pad/demos/disabled-signature-pad-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/signature-pad/demos/form-signature-pad-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/signature-pad/demos/preview-signature-pad-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/signature-pad/demos/small-signature-pad-demo.ts`
- 2 — `apps/showcase/src/app/pages/docs/toggle/demos/disabled-toggle-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/attachment/demos/basic-attachment-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/autocomplete/demos/basic-autocomplete-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/button/demos/sizes-button-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/button-group/demos/button-group-split-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/basic-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/css-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/html-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/interactive-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/json-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/light-theme-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/python-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/readonly-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/sql-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/typescript-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-editor/demos/word-wrap-code-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-viewer/demos/basic-code-viewer-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-viewer/demos/code-viewer-usage-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/code-viewer/demos/package-manager-code-viewer-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/combobox/demos/combobox-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/drawer/demos/right-drawer-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/editor/demos/full-featured-editor-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/emoji-picker/demos/input-emoji-picker-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/emoji-picker/demos/message-reactions-emoji-picker-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/input-group/demos/block-start-input-group-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/input-group/demos/button-input-group-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/input-group/demos/dropdown-input-group-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/input-group/demos/inline-end-input-group-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/notification-center/demos/inbox-notification-center-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/pdf-viewer/demos/pdf-viewer-presentation-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/sidebar/demos/floating-sidebar-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/spotlight/demos/basic-spotlight-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/spotlight/demos/interactive-spotlight-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/spotlight/demos/placement-spotlight-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/tags-input/demos/clearable-tags-input-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/tags-input/demos/form-field-tags-input-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/toggle/demos/basic-toggle-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/toggle/demos/outline-toggle-demo.ts`
- 1 — `apps/showcase/src/app/pages/docs/tour-guide/demos/full-tour-guide-demo.ts`

### Showcase pages (25)

- 4 — `apps/showcase/src/app/pages/getting-started/pdf-viewer.page.ts`
- 4 — `apps/showcase/src/app/pages/getting-started/ui.page.ts`
- 2 — `apps/showcase/src/app/pages/docs/editor/editor-page.ts`
- 2 — `apps/showcase/src/app/pages/getting-started/code.page.ts`
- 2 — `apps/showcase/src/app/pages/getting-started/editor.page.ts`
- 1 — `apps/showcase/src/app/components/package-manager-install/package-manager-install.ts`
- 1 — `apps/showcase/src/app/layouts/docs-layout/docs-layout.ts`
- 1 — `apps/showcase/src/app/pages/customize/customize-page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/carousel.page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/charts.page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/data-table.page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/mcp-server.page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/phone-input.page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/prerequisites.page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/qr-code.page.ts`
- 1 — `apps/showcase/src/app/pages/getting-started/ui-lab.page.ts`

### Blocks app (5)

- 4 — `apps/blocks/src/app/pages/data-table/data-table-pagination.ts`
- 1 — `apps/blocks/src/app/pages/dashboard/dashboard.page.ts`

### READMEs (66)

- 16 — `libs/ui-lab/src/lib/components/audio-player/README.md`
- 14 — `libs/ui-lab/src/lib/components/signature-pad/README.md`
- 5 — `libs/code/src/lib/components/code-viewer/README.md`
- 4 — `libs/ui-lab/src/lib/components/image-annotator/README.md`
- 4 — `libs/ui-lab/src/lib/components/transfer-list/README.md`
- 4 — `libs/ui-lab/src/lib/components/video-player/README.md`
- 3 — `libs/code/src/lib/components/code-editor/README.md`
- 3 — `libs/pdf-viewer/src/lib/components/pdf-viewer/README.md`
- 2 — `libs/editor/src/lib/components/editor/README.md`
- 2 — `libs/ui/src/lib/components/pagination/KEYBOARD-NAVIGATION.md`
- 2 — `libs/ui-lab/src/lib/components/notification-center/README.md`
- 1 — `libs/ui/src/lib/components/autocomplete/README.md`
- 1 — `libs/ui/src/lib/components/combobox/README.md`
- 1 — `libs/ui/src/lib/components/pagination/README.md`
- 1 — `libs/ui/src/lib/components/toggle/README.md`
- 1 — `libs/ui/src/lib/utilities/copy-to-clipboard/README.md`
- 1 — `libs/ui-lab/src/lib/components/tags-input/README.md`
- 1 — `libs/ui-lab/src/lib/components/tour-guide/README.md`
