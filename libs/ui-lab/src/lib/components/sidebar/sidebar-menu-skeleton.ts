import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSkeleton } from '../skeleton';

@Component({
  selector: 'div[sc-sidebar-menu-skeleton]',
  imports: [ScSkeleton],
  host: {
    'data-slot': 'sidebar-menu-skeleton',
    '[class]': 'class()',
  },
  template: `
    @if (showIcon()) {
      <div sc-skeleton class="size-4 rounded-md"></div>
    }
    <div
      sc-skeleton
      class="h-4 max-w-[var(--skeleton-width)] flex-1"
      [style.--skeleton-width]="width"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSidebarMenuSkeleton {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly showIcon = input<boolean>(false);

  protected readonly width = `${Math.floor(Math.random() * 40) + 50}%`;

  protected readonly class = computed(() =>
    cn('h-8 gap-2 rounded-md px-2 flex items-center', this.classInput()),
  );
}
