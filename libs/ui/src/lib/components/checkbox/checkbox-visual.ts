import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_CHECKBOX_FIELD } from './checkbox-types';

@Component({
  selector: 'span[scCheckboxVisual]',
  host: {
    'data-slot': 'checkbox-visual',
    '[class]': 'class()',
    '[attr.data-state]': 'checkbox.dataState()',
    // shadcn's: filled when checked or indeterminate.
    '[attr.data-checked]': "checkbox.dataState() === 'unchecked' ? null : ''",
    '[attr.data-indeterminate]': 'checkbox.indeterminate() || null',
    '[attr.aria-hidden]': 'true',
  },
  template: `
    <!-- The control's own marks, not icons to swap: drawn here. -->
    @if (checkbox.dataState() === 'indeterminate') {
      <svg
        viewBox="0 0 24 24"
        class="size-3.5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M5 12h14" />
      </svg>
    } @else if (checkbox.dataState() === 'checked') {
      <svg
        viewBox="0 0 24 24"
        class="size-3.5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ScCheckboxVisual {
  private readonly styles = injectPreset().checkbox;
  readonly checkbox = inject(SC_CHECKBOX_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.styles.visual, this.classInput()),
  );
}
