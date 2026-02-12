import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-opt-field-slot-caret]',
  host: {
    'data-slot': 'opt-field-slot-caret',
    '[class]': 'class()',
  },
  template: `
    <div class="h-4 w-px animate-caret-blink bg-foreground"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScOptFieldSlotCaret {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-0 flex items-center justify-center',
      this.classInput(),
    ),
  );
}
