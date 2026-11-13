import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
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
      'absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=inline-start]:-end-4 group-data-[side=inline-end]:start-0 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:translate-x-1/2',
      'in-data-[side=inline-start]:cursor-w-resize rtl:in-data-[side=inline-start]:cursor-e-resize in-data-[side=inline-end]:cursor-e-resize rtl:in-data-[side=inline-end]:cursor-w-resize in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
      '[[data-side=inline-start][data-state=collapsed]_&]:cursor-e-resize rtl:[[data-side=inline-start][data-state=collapsed]_&]:cursor-w-resize [[data-side=inline-end][data-state=collapsed]_&]:cursor-w-resize rtl:[[data-side=inline-end][data-state=collapsed]_&]:cursor-e-resize [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'group-data-[collapsible=offcanvas]:translate-x-0 rtl:group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:start-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
      '[[data-side=inline-start][data-collapsible=offcanvas]_&]:-end-2 [[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=inline-end][data-collapsible=offcanvas]_&]:-start-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      this.classInput(),
    ),
  );
}
