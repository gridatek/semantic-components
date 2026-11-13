import { _IdGenerator } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ScSheet, ScSheetPortal, ScSheetProvider } from '../sheet';
import { ScSidebarState } from './sidebar-state';

/** Where the sidebar sits: logical (flips right to left) or physical. */
export type ScSidebarSide = 'inline-start' | 'inline-end' | 'left' | 'right';

/**
 * The sidebar: beside the page on wide screens — collapsed off the screen
 * (`offcanvas`), to icons (`icon`) or never (`none`) — and a sheet over it
 * on phones (a dialog: the focus kept inside, Escape closes it). On an
 * `aside` it is a landmark (complementary) holding all of it, header and
 * footer too; on a `div`, none — then only your named
 * `nav[scSidebarContent]` is. Its `aria-label` names the `aside`, and the
 * sheet on phones.
 */
@Component({
  selector: 'div[scSidebar], aside[scSidebar]',
  imports: [ScSheetProvider, ScSheetPortal, ScSheet, NgTemplateOutlet],
  template: `
    <ng-template #content><ng-content /></ng-template>

    <!-- Not collapsible: inline at every width, as shadcn's (a phone too). -->
    @if (collapsible() === 'none') {
      <div
        class="bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </div>
    } @else if (state.isMobile()) {
      <div scSheetProvider [(open)]="state.openMobile" [side]="sheetSide()">
        <ng-template scSheetPortal>
          <div
            scSheet
            data-slot="sidebar"
            data-mobile="true"
            class="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [--sidebar-width:var(--sidebar-width-mobile)]"
            [id]="id"
            [attr.aria-label]="label() || null"
            [attr.aria-labelledby]="null"
            [attr.aria-describedby]="null"
          >
            <div class="flex size-full flex-col">
              <ng-container [ngTemplateOutlet]="content" />
            </div>
          </div>
        </ng-template>
      </div>
    } @else {
      <!-- Holds the sidebar's place in the page. -->
      <div data-slot="sidebar-gap" [class]="gapClass()"></div>
      <div
        data-slot="sidebar-container"
        [attr.data-side]="side()"
        [class]="containerClass()"
      >
        <div data-slot="sidebar-inner" [class]="innerClass">
          <ng-container [ngTemplateOutlet]="content" />
        </div>
      </div>
    }
  `,
  host: {
    'data-slot': 'sidebar',
    '[id]': 'state.isMobile() && collapsible() !== "none" ? null : id',
    // An aside's name; a div has none (it would be ignored, or flagged).
    '[attr.aria-label]': 'aside && label() ? label() : null',
    '[attr.data-state]': 'state.state()',
    '[attr.data-collapsible]':
      'state.state() === "collapsed" ? collapsible() : ""',
    '[attr.data-variant]': 'variant()',
    '[attr.data-side]': 'side()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSidebar {
  protected readonly state = inject(ScSidebarState);

  readonly classInput = input<string>('', { alias: 'class' });
  /**
   * Where it sits: `inline-start` (default) or `inline-end` of the line, which
   * flip right to left; or `left` / `right`, which stay put. `data-side` is the
   * word given: the CSS does the rest, no direction read in script.
   */
  readonly side = input<ScSidebarSide>('inline-start');
  readonly variant = input<'sidebar' | 'floating' | 'inset'>('sidebar');
  readonly collapsible = input<'offcanvas' | 'icon' | 'none'>('offcanvas');
  /** Names the sheet on phones. */
  readonly label = input<string>('', { alias: 'aria-label' });

  protected readonly id = inject(_IdGenerator).getId('sc-sidebar-');
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** On an `aside`: a landmark, named by its `aria-label`. */
  protected readonly aside = this.element.tagName === 'ASIDE';
  /** The direction, read in the browser (the sheet only shows there). */
  private readonly rtl = signal(false);
  protected readonly sheetSide = computed(() =>
    this.side() === 'left' || this.side() === 'right'
      ? this.side()
      : (this.side() === 'inline-start') !== this.rtl()
        ? 'left'
        : 'right',
  );

  private readonly floating = computed(
    () => this.variant() === 'floating' || this.variant() === 'inset',
  );

  protected readonly class = computed(() =>
    cn(
      this.collapsible() === 'none'
        ? 'contents'
        : 'group peer text-sidebar-foreground hidden md:block',
      this.classInput(),
    ),
  );

  protected readonly gapClass = computed(() =>
    cn(
      'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
      'group-data-[collapsible=offcanvas]:w-0',
      this.floating()
        ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
    ),
  );

  protected readonly containerClass = computed(() =>
    cn(
      'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[inset-inline-start,inset-inline-end,left,right,width] duration-200 ease-linear md:flex',
      'data-[side=inline-start]:start-0 data-[side=inline-start]:group-data-[collapsible=offcanvas]:start-[calc(var(--sidebar-width)*-1)]',
      'data-[side=inline-end]:end-0 data-[side=inline-end]:group-data-[collapsible=offcanvas]:end-[calc(var(--sidebar-width)*-1)]',
      'data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
      'data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
      this.floating()
        ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=inline-start]:border-e group-data-[side=inline-end]:border-s group-data-[side=left]:border-r group-data-[side=right]:border-l',
    ),
  );

  protected readonly innerClass = cn(injectPreset().sidebar.inner);

  constructor() {
    this.state.sidebarId.set(this.id);
    afterNextRender(() =>
      this.rtl.set(getComputedStyle(this.element).direction === 'rtl'),
    );
    inject(DestroyRef).onDestroy(() => this.state.sidebarId.set(null));
  }
}
