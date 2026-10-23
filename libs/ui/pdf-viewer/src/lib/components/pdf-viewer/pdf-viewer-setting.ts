import {
  Directive,
  type WritableSignal,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ScSlider, ScSwitch, ScToggleGroup, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfViewerSettingKey } from './pdf-viewer-types';

/**
 * Binds a control to a viewer setting, both ways:
 *
 * - a single `scToggleGroup` — `cursorTool`, `scrollMode`, `spreadMode`,
 *   `highlightColor`, `freetextColor`, `inkColor` (items' values are the
 *   modes, or CSS colours);
 * - a `scSlider` — `highlightThickness`, `freetextSize`, `inkThickness`,
 *   `inkOpacity` (set its `min` / `max` / `step`);
 * - a `scSwitch` — `highlightShowAll`.
 *
 * Write the control, its items and labels. A toggle group never ends up with
 * nothing selected: a setting always has a value.
 */
@Directive({
  selector:
    '[scToggleGroup][scPdfViewerSetting], input[scSlider][scPdfViewerSetting], input[scSwitch][scPdfViewerSetting]',
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

  protected readonly class = computed(() => cn(this.classInput()));

  /** The viewer's signal for the setting. */
  private readonly target = computed(
    () => this.pdfViewer[this.setting()] as WritableSignal<unknown>,
  );

  constructor() {
    const toggleGroup = inject(ScToggleGroup, { self: true, optional: true });
    const slider = inject(ScSlider, { self: true, optional: true });
    const switchControl = inject(ScSwitch, { self: true, optional: true });
    const control =
      toggleGroup?.value ?? slider?.value ?? switchControl?.checked;
    if (!control) return;

    // Viewer → control.
    effect(() => {
      const value = this.target()();
      untracked(() => (control.set as (value: unknown) => void)(value));
    });

    // Control → viewer.
    control.subscribe((value: unknown) => {
      const target = untracked(this.target);
      if (toggleGroup && (typeof value !== 'string' || !value)) {
        // A second click on the selected item clears a single toggle group;
        // a setting always has a value, so put it back.
        toggleGroup.value.set(untracked(target) as string);
        return;
      }
      target.set(value);
    });
  }
}
