import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scMultiselectPopup]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'multiselect-popup',
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95 duration-150',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectPopup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground w-full overflow-hidden rounded-lg border p-1 shadow-md',
      this.classInput(),
    ),
  );
}
