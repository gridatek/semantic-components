import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scSelectPopup]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'select-popup',
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95 duration-150',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectPopup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground ring-foreground/10 relative z-50 flex w-full max-h-44 min-w-36 flex-col overflow-hidden rounded-lg p-1 shadow-md ring-1',
      this.classInput(),
    ),
  );
}
