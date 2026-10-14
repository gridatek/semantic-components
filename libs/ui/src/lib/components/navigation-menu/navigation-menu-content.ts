import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenuItem } from './navigation-menu-item';

/** An item's content: animates in when shown and out when it goes (`animate.enter` / `animate.leave`). */
@Component({
  selector: 'div[scNavigationMenuContent]',
  template: ` <ng-content /> `,
  host: {
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNavigationMenuContent {
  private readonly menuItem = inject(ScNavigationMenuItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'block',
      'start-0 top-0 w-full md:absolute md:w-auto',
      'bg-popover text-popover-foreground',
      'rounded-md border shadow-lg',
      'overflow-hidden duration-150',
      '**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
      this.classInput(),
    ),
  );

  onMouseEnter(): void {
    this.menuItem.cancelHide();
  }

  onMouseLeave(): void {
    this.menuItem.onMouseLeave();
  }
}
