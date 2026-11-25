import {
  Directive,
  type WritableSignal,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ScSlider, ScSwitch, ScToggleGroup } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfViewerNextSettingKey } from './pdf-viewer-next-types';

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
    '[scToggleGroup][scPdfViewerNextSetting], input[scSlider][scPdfViewerNextSetting], input[scSwitch][scPdfViewerNextSetting]',
  host: {
    'data-slot': 'pdf-viewer-setting',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextSetting {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly setting = input.required<ScPdfViewerNextSettingKey>({
    alias: 'scPdfViewerNextSetting',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

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
