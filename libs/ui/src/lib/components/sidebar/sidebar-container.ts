import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scSidebarContainer]',
  host: {
    'data-slot': 'sidebar-container',
    '[class]': 'class()',
  },
})
export class ScSidebarContainer {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<'sidebar' | 'floating' | 'inset'>('sidebar');

  protected readonly class = computed(() => {
    const variant = this.variant();

    return cn(
      'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
      'data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
      'data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
      variant === 'floating' || variant === 'inset'
        ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-e group-data-[side=right]:border-s',
      this.classInput(),
    );
  });
}
