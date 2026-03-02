import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenuItem } from './navigation-menu-item';

@Component({
  selector: 'div[scNavigationMenuContent]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'navigation-menu-content',
    '[class]': 'class()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuContent {
  private readonly menuItem = inject(ScNavigationMenuItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'block',
      'left-0 top-0 w-full md:absolute md:w-auto',
      'bg-popover text-popover-foreground',
      'rounded-md border shadow-lg',
      'overflow-hidden',
      'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out',
      'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
      'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
      'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
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
