import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_CHECKBOX_FIELD } from './checkbox-types';

@Component({
  selector: 'span[scCheckboxVisual]',
  host: {
    'data-slot': 'checkbox-visual',
    '[class]': 'class()',
    '[attr.data-state]': 'checkbox.dataState()',
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
  readonly checkbox = inject(SC_CHECKBOX_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-input dark:bg-input/30 transition-colors',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary',
      'peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-3',
      'peer-aria-invalid:border-destructive peer-aria-invalid:ring-destructive/20 peer-aria-invalid:ring-3',
      'dark:peer-aria-invalid:border-destructive/50 dark:peer-aria-invalid:ring-destructive/40',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
