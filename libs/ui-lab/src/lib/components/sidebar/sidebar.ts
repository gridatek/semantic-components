import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';
import {
  ScSheet,
  ScSheetClose,
  ScSheetPortal,
  ScSheetProvider,
} from '../sheet';
import { ScSidebarState } from './sidebar-state.service';

@Component({
  selector: 'div[sc-sidebar]',
  imports: [
    ScSheetProvider,
    ScSheetPortal,
    ScSheet,
    ScSheetClose,
    SiXIcon,
    NgTemplateOutlet,
  ],
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>

    <!-- Mobile sidebar uses default width from sheet component -->
    @if (isMobile()) {
      <div sc-sheet-provider [(open)]="state.openMobile" [side]="side()">
        <ng-template scSheetPortal>
          <div
            sc-sheet
            class="bg-sidebar text-sidebar-foreground p-0 flex h-full flex-col"
          >
            <button sc-sheet-close>
              <svg si-x-icon></svg>
              <span class="sr-only">Close</span>
            </button>
            <ng-container *ngTemplateOutlet="content" />
          </div>
        </ng-template>
      </div>
    } @else {
      <div
        class="group peer hidden md:block text-sidebar-foreground"
        [attr.data-state]="state.state()"
        [attr.data-collapsible]="
          state.state() === 'collapsed' ? collapsible() : ''
        "
      >
        <div [class]="gapClass()"></div>
        <div [class]="containerClass()">
          <div [class]="innerClass()">
            <ng-container *ngTemplateOutlet="content" />
          </div>
        </div>
      </div>
    }
  `,
  host: {
    'data-slot': 'sidebar',
    '[attr.data-state]': 'state.state()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-side]': 'side()',
    '[attr.data-collapsible]': 'collapsible()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSidebar {
  readonly state = inject(ScSidebarState);

  readonly side = input<'left' | 'right'>('left');
  readonly variant = input<'sidebar' | 'floating' | 'inset'>('sidebar');
  readonly collapsible = input<'offcanvas' | 'icon' | 'none'>('offcanvas');

  protected readonly isMobile = computed(() => this.state.isMobile());

  protected readonly gapClass = computed(() => {
    const side = this.side();
    const variant = this.variant();

    return cn(
      'relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear',
      'group-data-[collapsible=offcanvas]:w-0',
      'group-data-[side=right]:rotate-180',
      variant === 'floating' || variant === 'inset'
        ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
        : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]',
    );
  });

  protected readonly containerClass = computed(() => {
    const side = this.side();
    const variant = this.variant();

    return cn(
      'fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex',
      side === 'left'
        ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
        : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
      variant === 'floating' || variant === 'inset'
        ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
        : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l',
    );
  });

  protected readonly innerClass = computed(() =>
    cn(
      'flex h-full w-full flex-col bg-sidebar',
      'group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border',
    ),
  );
}
