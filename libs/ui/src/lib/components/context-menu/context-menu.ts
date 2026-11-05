import { MenuTrigger } from '@angular/aria/menu';
import { type Direction, Directionality } from '@angular/cdk/bidi';
import { type ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  Injector,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { SC_MENU, type ScMenuContext } from '../menu/menu-context';
import { ScMenuPortal } from '../menu/menu-portal';
import { ScContextMenuTrigger } from './context-menu-trigger';
import { SC_CONTEXT_MENU } from './context-menu-types';

export type ScContextMenuSide = 'top' | 'bottom' | 'start' | 'end';

/**
 * Holds a context menu: the area (its trigger) and the menu, in a portal.
 * Catches the right-click on the area and opens the menu there.
 *
 * The menu is placed against an anchor parked at the pointer: an overlay
 * needs an element to attach to, and a pointer is not one. Going through the
 * overlay is what makes the menu flip near a viewport edge, close on an
 * outside click and on Escape.
 */
@Component({
  selector: 'div[scContextMenu]',
  providers: [
    { provide: SC_CONTEXT_MENU, useExisting: ScContextMenu },
    { provide: SC_MENU, useExisting: ScContextMenu },
    { provide: Directionality, useClass: ScElementDirectionality },
  ],
  imports: [MenuTrigger, OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    <div
      #anchor
      ngMenuTrigger
      #cursor="ngMenuTrigger"
      [menu]="menuPortal().menu()"
      style="position: fixed; visibility: hidden"
      [style.left.px]="position().x"
      [style.top.px]="position().y"
    ></div>

    <ng-template
      [cdkConnectedOverlayOpen]="cursor.expanded()"
      [cdkConnectedOverlay]="{
        origin: anchor,
        usePopover: 'inline',
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
      }"
      [cdkConnectedOverlayPositions]="positions()"
      (backdropClick)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
      cdkAttachPopoverAsChild
    >
      <ng-container [ngTemplateOutlet]="menuPortal().templateRef" />
    </ng-template>
  `,
  host: {
    '[class]': 'class()',
    '(contextmenu)': 'onContextMenu($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScContextMenu implements ScMenuContext {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Open or not; `[(open)]`. Opened here, the menu is at the area's centre. */
  readonly open = model(false);
  /**
   * Where the menu opens from the pointer: at its reading end (default), its
   * start, above or below it — at another side if there is no room.
   */
  readonly side = input<ScContextMenuSide>('end');

  /** Opened by a pointer: no item highlighted until it moves or a key. */
  readonly quiet = signal(false);
  private readonly directionality = inject(Directionality);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly direction = (): Direction => this.directionality.value;
  readonly lang = (): string | null =>
    this.host.closest('[lang]')?.getAttribute('lang') ?? null;

  /** Viewport coordinates of the last right-click. */
  readonly position = signal({ x: 0, y: 0 });

  private readonly trigger = contentChild(ScContextMenuTrigger);
  protected readonly menuPortal = contentChild.required(ScMenuPortal);
  private readonly cursor = viewChild(MenuTrigger);
  private readonly expanded = computed(
    () => this.cursor()?.expanded() ?? false,
  );

  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  /** The element that had focus when the menu opened. */
  private returnFocus: HTMLElement | null = null;

  constructor() {
    // [(open)] follows the menu…
    effect(() => {
      const expanded = this.expanded();
      untracked(() => this.open.set(expanded));
    });
    // …and opens or closes it.
    effect(() => {
      const open = this.open();
      if (open === untracked(this.expanded)) return;
      untracked(() => (open ? this.openAtCentre() : this.close()));
    });
    // Aria refocuses its trigger on close, but here that is the hidden anchor,
    // so focus would drop to the page. Give it back to where it came from
    // (the area, for a keyboard user) — unless the user has moved it.
    effect(() => {
      if (this.expanded() || !this.returnFocus) return;
      const target = this.returnFocus;
      this.returnFocus = null;
      afterNextRender(
        () => {
          // Restore unless the user moved focus somewhere else: focus may
          // still sit on a menu item that is about to go, or already gone.
          const active = this.document.activeElement;
          const lost =
            !active ||
            active === this.document.body ||
            !active.isConnected ||
            !!this.menuPortal().menu()?.element.contains(active);
          if (lost) target.focus();
        },
        { injector: this.injector },
      );
    });
  }

  /**
   * Beside the pointer, 4px along it (shadcn's): at the reading end by
   * default. The CDK mirrors start and end right to left, not the offsets:
   * turned here. Each side falls back to the opposite one.
   */
  protected readonly positions = computed((): ConnectedPosition[] => {
    const along = this.direction() === 'rtl' ? -4 : 4;
    const at = (
      overlayX: 'start' | 'end',
      overlayY: 'top' | 'bottom',
      offsetX: number,
      offsetY: number,
    ): ConnectedPosition => ({
      originX: 'start',
      originY: 'top',
      overlayX,
      overlayY,
      offsetX,
      offsetY,
    });
    const end = at('start', 'top', 0, 4);
    const start = at('end', 'top', 0, 4);
    const bottom = at('start', 'top', along, 0);
    const top = at('start', 'bottom', along, 0);
    const up = (p: ConnectedPosition): ConnectedPosition => ({
      ...p,
      overlayY: 'bottom',
      offsetY: -(p.offsetY ?? 0),
    });
    switch (this.side()) {
      case 'start':
        return [start, end, up(start), up(end)];
      case 'top':
        return [top, bottom];
      case 'bottom':
        return [bottom, top];
      default:
        return [end, start, up(end), up(start)];
    }
  });

  protected onContextMenu(event: MouseEvent): void {
    if (!this.trigger()) return;
    event.preventDefault();
    this.position.set({ x: event.clientX, y: event.clientY });
    // A right-click, or a long press (touch, pen). The Menu key and Shift+F10
    // fire it as a mouse event too, but with no button pressed (Chrome: -1).
    const type = (event as Partial<PointerEvent>).pointerType;
    this.show(event.button === 2 || type === 'touch' || type === 'pen');
  }

  /** Closes the menu. */
  close(): void {
    const cursor = this.cursor();
    if (cursor?.expanded()) cursor.close();
  }

  /** Opened by `[(open)]`: at the area's centre, as by the keyboard. */
  private openAtCentre(): void {
    const area = this.trigger()?.element.getBoundingClientRect();
    if (area) {
      this.position.set({
        x: area.left + area.width / 2,
        y: area.top + area.height / 2,
      });
    }
    this.show(false);
  }

  /** Opens at the position; `pointer`: by a pointer, not a key. */
  private show(pointer: boolean): void {
    this.returnFocus = this.document.activeElement as HTMLElement | null;
    this.quiet.set(pointer);
    this.cursor()?.open();
  }

  protected onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.close();
  }
}
