import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ScTabs } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScPdfViewerSignatureForm } from './pdf-viewer-signature-form';

/**
 * Binds tabs (`scTabs`) to how the signature is made, both ways, in a
 * `scPdfViewerSignatureForm`: the tabs' values are `type`, `draw` and
 * `image`. Write the tabs, their panels and labels.
 */
@Directive({
  selector: '[scTabs][scPdfViewerSignatureMode]',
  host: {
    'data-slot': 'pdf-viewer-signature-mode',
    '[class]': 'class()',
  },
})
export class ScPdfViewerSignatureMode {
  private readonly form = inject(ScPdfViewerSignatureForm);

  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const tabs = inject(ScTabs, { self: true });
    effect(() => {
      const mode = this.form.mode();
      untracked(() => tabs.value.set(mode));
    });
    tabs.value.subscribe((mode) => this.form.setMode(mode));
  }
}
