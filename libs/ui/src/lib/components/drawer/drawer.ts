import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScDrawerProvider } from './drawer-provider';

/**
 * The drawer's panel: slides in from its edge when shown and back out when it
 * goes (`animate.enter` / `animate.leave`; the direction sets the edge).
 */
@Directive({
  selector: 'div[scDrawer]',
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.data-direction]': 'drawer.direction()',
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0',
    'animate.leave': 'animate-out fade-out-0',
  },
})
export class ScDrawer {
  readonly drawer = inject(ScDrawerProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground flex h-auto flex-col text-sm fixed z-50 group/drawer',
      // Position and border based on direction
      'data-[direction=bottom]:inset-x-0 data-[direction=bottom]:bottom-0 data-[direction=bottom]:mt-24 data-[direction=bottom]:max-h-[80vh] data-[direction=bottom]:rounded-t-xl data-[direction=bottom]:border-t',
      'data-[direction=left]:inset-y-0 data-[direction=left]:left-0 data-[direction=left]:w-3/4 data-[direction=left]:rounded-r-xl data-[direction=left]:border-r',
      'data-[direction=right]:inset-y-0 data-[direction=right]:right-0 data-[direction=right]:w-3/4 data-[direction=right]:rounded-l-xl data-[direction=right]:border-l',
      'data-[direction=top]:inset-x-0 data-[direction=top]:top-0 data-[direction=top]:mb-24 data-[direction=top]:max-h-[80vh] data-[direction=top]:rounded-b-xl data-[direction=top]:border-b',
      'data-[direction=left]:sm:max-w-sm data-[direction=right]:sm:max-w-sm',
      // Where it slides from and to (read by the enter / leave animations)
      'data-[direction=top]:slide-in-from-top data-[direction=top]:slide-out-to-top',
      'data-[direction=right]:slide-in-from-right data-[direction=right]:slide-out-to-right',
      'data-[direction=bottom]:slide-in-from-bottom data-[direction=bottom]:slide-out-to-bottom',
      'data-[direction=left]:slide-in-from-left data-[direction=left]:slide-out-to-left',
      this.classInput(),
    ),
  );
}
