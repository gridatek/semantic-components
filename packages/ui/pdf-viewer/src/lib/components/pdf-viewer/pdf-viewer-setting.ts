import {
  Directive,
  type WritableSignal,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import {
  ScCheckbox,
  ScSlider,
  ScSwitch,
  ScTabs,
  ScToggleGroup,
  bindInput,
} from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type {
  ScPdfEditorMode,
  ScPdfViewerSettingKey,
} from './pdf-viewer-types';

/**
 * Binds a control to a viewer setting, both ways:
 *
 * - a single `scToggleGroup` — `editorMode` (the annotation tools: nothing
 *   pressed is `none`; disabled while the document forbids changes),
 *   `cursorTool`, `scrollMode`, `spreadMode` — items' values are the modes
 *   (colours: `scPdfViewerColor` swatches);
 * - `scTabs` — `sidebarView` (the tabs' values are the views);
 * - a `scSlider` — `highlightThickness`, `freetextSize`, `inkThickness`,
 *   `inkOpacity` (set its `min` / `max` / `step`);
 * - a `scSwitch` or `scCheckbox` — `highlightShowAll`, `findHighlightAll`,
 *   `findMatchCase`, `findEntireWord`, `findMatchDiacritics`, `caretBrowsing`,
 *   `pageColors` (disabled where the browser can't draw them:
 *   `pageColorsSupported()`).
 *
 * Write the control, its items and labels. A toggle group never ends up with
 * nothing selected (but the tools': none is a tool): a setting always has a
 * value.
 */
@Directive({
  selector:
    '[scToggleGroup][scPdfViewerSetting], [scTabs][scPdfViewerSetting], input[scSlider][scPdfViewerSetting], input[scSwitch][scPdfViewerSetting], input[scCheckbox][scPdfViewerSetting]',
  host: {
    'data-slot': 'pdf-viewer-setting',
    '[class]': 'class()',
  },
})
export class ScPdfViewerSetting {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly setting = input.required<ScPdfViewerSettingKey>({
    alias: 'scPdfViewerSetting',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  /** The viewer's signal for the setting. */
  private readonly target = computed(
    () => this.pdfViewer[this.setting()] as WritableSignal<unknown>,
  );

  /** The annotation tools: `none` is a tool too. */
  private readonly tools = computed(() => this.setting() === 'editorMode');

  constructor() {
    const toggleGroup = inject(ScToggleGroup, { self: true, optional: true });
    const tabs = inject(ScTabs, { self: true, optional: true });
    const slider = inject(ScSlider, { self: true, optional: true });
    const switchControl = inject(ScSwitch, { self: true, optional: true });
    const checkbox = inject(ScCheckbox, { self: true, optional: true });
    const control =
      toggleGroup?.value ??
      tabs?.value ??
      slider?.value ??
      switchControl?.checked ??
      checkbox?.checked;
    if (!control) return;

    // The tools are off while the document forbids changes.
    if (toggleGroup) {
      bindInput(
        toggleGroup.disabled,
        computed(() => this.tools() && !this.pdfViewer.canEdit()),
      );
    }

    // Page colours where the browser can't draw them (WebKit): off.
    const onOff = switchControl ?? checkbox;
    if (onOff) {
      bindInput(
        onOff.disabled,
        computed(
          () =>
            this.setting() === 'pageColors' &&
            !this.pdfViewer.pageColorsSupported(),
        ),
      );
    }

    // Viewer → control (a toggle group holds its pressed values: one, here).
    effect(() => {
      const value = this.target()();
      untracked(() =>
        (control.set as (value: unknown) => void)(
          toggleGroup ? [value] : value,
        ),
      );
    });

    // Control → viewer.
    control.subscribe((value: unknown) => {
      const target = untracked(this.target);
      if (toggleGroup) {
        const [pressed] = value as unknown[];
        if (untracked(this.tools)) {
          const mode = (pressed as ScPdfEditorMode | undefined) ?? 'none';
          const current = untracked(this.pdfViewer.editorMode);
          // The group showing the viewer's mode (set from it): nothing to do.
          if (mode === current) return;
          this.pdfViewer.setEditorMode(mode);
          // The document may forbid it: the group shows the mode it has.
          const applied = untracked(this.pdfViewer.editorMode);
          if (applied !== mode) toggleGroup.value.set([applied]);
          return;
        }
        if (pressed === undefined) {
          // A second click on the pressed item releases it; a setting always
          // has a value, so press it again.
          toggleGroup.value.set([untracked(target)]);
          return;
        }
        target.set(pressed);
        return;
      }
      target.set(value);
    });
  }
}
