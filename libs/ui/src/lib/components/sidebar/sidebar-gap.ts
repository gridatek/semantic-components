import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scSidebarGap]',
  host: {
    'data-slot': 'sidebar-gap',
    '[class]': 'class()',
  },
})
export class ScSidebarGap {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<'sidebar' | 'floating' | 'inset'>('sidebar');

  protected readonly class = computed(() =>
    cn(
      'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
      'group-data-[collapsible=offcanvas]:w-0',
      'group-data-[side=right]:rotate-180',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
      this.classInput(),
    ),
  );
}
