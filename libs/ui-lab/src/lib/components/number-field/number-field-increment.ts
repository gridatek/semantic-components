import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { SC_NUMBER_FIELD } from './number-field';

@Component({
  selector: 'button[scNumberFieldIncrement]',
  imports: [SiPlusIcon],
  template: `
    <ng-content>
      <svg siPlusIcon class="size-4"></svg>
    </ng-content>
  `,
  host: {
    'data-slot': 'number-field-increment',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!numberField.canIncrement()',
    '[attr.aria-label]': '"Increase value"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNumberFieldIncrement {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex size-9 items-center justify-center border-l border-input',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'rounded-r-md',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.numberField.increment();
  }
}
