import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiCheckIcon, SiMinusIcon } from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';
import { ScCheckboxIndicator } from './checkbox-indicator';
import { SC_CHECKBOX_FIELD } from './checkbox-types';

@Component({
  selector: 'span[sc-visual-checkbox]',
  imports: [ScCheckboxIndicator, SiCheckIcon, SiMinusIcon],
  host: {
    'data-slot': 'visual-checkbox',
    '[class]': 'class()',
    '[attr.data-state]': 'checkbox.dataState()',
  },
  template: `
    <span sc-checkbox-indicator [state]="checkbox.dataState()">
      @if (checkbox.dataState() === 'indeterminate') {
        <svg si-minus-icon class="size-4"></svg>
      } @else if (checkbox.dataState() === 'checked') {
        <svg si-check-icon class="size-4"></svg>
      }
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVisualCheckbox {
  readonly checkbox = inject(SC_CHECKBOX_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none inline-flex size-4 shrink-0 items-center justify-center',
      'ring-offset-background',
      'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
