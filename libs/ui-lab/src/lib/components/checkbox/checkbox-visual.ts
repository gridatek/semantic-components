import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiCheckIcon, SiMinusIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { SC_CHECKBOX_FIELD } from './checkbox-types';

@Component({
  selector: 'span[scCheckboxVisual]',
  imports: [SiCheckIcon, SiMinusIcon],
  host: {
    'data-slot': 'checkbox-visual',
    '[class]': 'class()',
    '[attr.data-state]': 'checkbox.dataState()',
    '[attr.aria-hidden]': 'true',
  },
  template: `
    @if (checkbox.dataState() === 'indeterminate') {
      <svg si-minus-icon class="size-4"></svg>
    } @else if (checkbox.dataState() === 'checked') {
      <svg si-check-icon class="size-4"></svg>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCheckboxVisual {
  readonly checkbox = inject(SC_CHECKBOX_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary transition-colors',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
      'ring-offset-background',
      'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
