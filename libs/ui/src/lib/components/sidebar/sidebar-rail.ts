import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSidebarState } from './sidebar-state';

/**
 * The sidebar's edge: a click opens or closes it. For the pointer only —
 * out of the tab order and hidden from screen readers, so it needs no name:
 * the trigger is the way for everyone.
 */
@Directive({
  selector: 'button[scSidebarRail]',
  host: {
    'data-slot': 'sidebar-rail',
    type: 'button',
    tabindex: '-1',
    'aria-hidden': 'true',
    '[class]': 'class()',
    '(click)': 'state.open.set(!state.open())',
  },
})
export class ScSidebarRail {
  protected readonly state = inject(ScSidebarState);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=start]:-end-4 group-data-[side=end]:start-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:translate-x-1/2',
      'in-data-[side=start]:cursor-w-resize rtl:in-data-[side=start]:cursor-e-resize in-data-[side=end]:cursor-e-resize rtl:in-data-[side=end]:cursor-w-resize',
      '[[data-side=start][data-state=collapsed]_&]:cursor-e-resize rtl:[[data-side=start][data-state=collapsed]_&]:cursor-w-resize [[data-side=end][data-state=collapsed]_&]:cursor-w-resize rtl:[[data-side=end][data-state=collapsed]_&]:cursor-e-resize',
      'group-data-[collapsible=offcanvas]:translate-x-0 rtl:group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:start-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
      '[[data-side=start][data-collapsible=offcanvas]_&]:-end-2',
      '[[data-side=end][data-collapsible=offcanvas]_&]:-start-2',
      this.classInput(),
    ),
  );
}
