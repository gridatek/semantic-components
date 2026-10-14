import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverProvider } from './popover-provider';

/**
 * The popover's panel. Angular plays its enter animation when it is shown
 * and its leave animation when it goes, removing it only once that ends.
 */
@Component({
  selector: 'div[scPopover]',
  template: ` <ng-content /> `,
  host: {
    role: 'dialog',
    '[class]': 'class()',
    '[attr.data-side]': 'popover.side()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPopover {
  readonly popover = inject(ScPopoverProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground z-50 w-72 rounded-lg ring-1 ring-foreground/10 flex flex-col gap-2.5 p-2.5 text-sm shadow-md outline-hidden duration-100',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      this.classInput(),
    ),
  );
}
