import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSkeleton } from '../skeleton';

let count = 0;

/** A menu item while it loads: an icon (`showIcon`) and a line of text. */
@Component({
  selector: 'div[scSidebarNextMenuSkeleton]',
  imports: [ScSkeleton],
  template: `
    @if (showIcon()) {
      <div scSkeleton [class]="styles.menuSkeletonIcon"></div>
    }
    <div
      scSkeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      [style.--skeleton-width]="width"
    ></div>
  `,
  host: {
    'data-slot': 'sidebar-menu-skeleton',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSidebarNextMenuSkeleton {
  protected readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly showIcon = input(false, { transform: booleanAttribute });

  /** Between 50 and 90 %: varied, and the same on the server and in the browser. */
  protected readonly width = `${50 + ((count++ * 37) % 41)}%`;

  protected readonly class = computed(() =>
    cn(this.styles.menuSkeleton, this.classInput()),
  );
}
