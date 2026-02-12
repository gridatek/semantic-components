import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_NUMBER_FIELD } from './number-field';

@Component({
  selector: 'button[sc-number-field-decrement]',
  template: `
    <ng-content>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4"
      >
        <path d="M5 12h14" />
      </svg>
    </ng-content>
  `,
  host: {
    'data-slot': 'number-field-decrement',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!numberField.canDecrement()',
    '[attr.aria-label]': '"Decrease value"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNumberFieldDecrement {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex size-9 items-center justify-center border-r border-input',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'rounded-l-md',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.numberField.decrement();
  }
}
