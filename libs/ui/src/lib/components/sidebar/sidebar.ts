import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import {
  ScSheet,
  ScSheetClose,
  ScSheetPortal,
  ScSheetProvider,
} from '../sheet';
import { ScSidebarContainer } from './sidebar-container';
import { ScSidebarGap } from './sidebar-gap';
import { ScSidebarInner } from './sidebar-inner';
import { ScSidebarState } from './sidebar-state';

@Component({
  selector: 'div[scSidebar]',
  imports: [
    ScSheetProvider,
    ScSheetPortal,
    ScSheet,
    ScSheetClose,
    SiXIcon,
    NgTemplateOutlet,
    ScSidebarContainer,
    ScSidebarGap,
    ScSidebarInner,
  ],
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>

    <!-- Mobile sidebar uses default width from sheet component -->
    @if (isMobile()) {
      <div scSheetProvider [(open)]="state.openMobile" [side]="side()">
        <ng-template scSheetPortal>
          <div
            scSheet
            class="bg-sidebar text-sidebar-foreground flex h-full flex-col p-0"
          >
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
            <ng-container *ngTemplateOutlet="content" />
          </div>
        </ng-template>
      </div>
    } @else if (collapsible() === 'none') {
      <div
        scSidebarInner
        class="bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col"
      >
        <ng-container *ngTemplateOutlet="content" />
      </div>
    } @else {
      <div
        class="group peer text-sidebar-foreground hidden md:block"
        [attr.data-state]="state.state()"
        [attr.data-collapsible]="
          state.state() === 'collapsed' ? collapsible() : ''
        "
        [attr.data-variant]="variant()"
        [attr.data-side]="side()"
      >
        <div scSidebarGap [variant]="variant()"></div>
        <div scSidebarContainer [variant]="variant()">
          <div scSidebarInner>
            <ng-container *ngTemplateOutlet="content" />
          </div>
        </div>
      </div>
    }
  `,
  host: {
    role: 'navigation',
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
}
