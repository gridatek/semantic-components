import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-navigation-menu-viewport]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'navigation-menu-viewport',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuViewport {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'origin-top-center bg-popover text-popover-foreground',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
      'relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow',
      'md:w-[var(--radix-navigation-menu-viewport-width)]',
      this.classInput(),
    ),
  );
}
