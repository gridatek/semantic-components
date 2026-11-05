import { Menu, MenuTrigger } from '@angular/aria/menu';
import { type Direction, Directionality } from '@angular/cdk/bidi';
import { type ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
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
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { ScMenu } from '../menu';
import { SC_MENU, type ScMenuContext } from '../menu/menu-context';
import { SC_CONTEXT_MENU_PROVIDER } from './context-menu-types';

export type ScContextMenuSide = 'top' | 'bottom' | 'start' | 'end';

/**
 * Holds the menu for a context menu: an anchor element parked at the pointer,
 * and the overlay that positions the menu against it.
 *
 * The anchor exists because an overlay needs something to attach to, and a
 * pointer is not an element. Moving it is what places the menu, and going
 * through the overlay is what makes the menu flip near a viewport edge,
 * dismiss on an outside click, and close on Escape.
 */
@Component({
  selector: 'div[scContextMenu]',
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: SC_MENU, useExisting: ScContextMenu },
  ],
  imports: [MenuTrigger, OverlayModule],
  template: `
    <div
      #triggerEl
      ngMenuTrigger
      #trigger="ngMenuTrigger"
      [menu]="menu()"
      style="position: fixed; visibility: hidden"
      [style.left.px]="position().x"
      [style.top.px]="position().y"
    ></div>

    <ng-template
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      [cdkConnectedOverlay]="{
        origin: triggerEl,
        usePopover: 'inline',
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
      }"
      [cdkConnectedOverlayPositions]="positions()"
      (backdropClick)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
      cdkAttachPopoverAsChild
    >
      <ng-content />
    </ng-template>
  `,
  host: {
    'data-slot': 'context-menu',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScContextMenu implements ScMenuContext {
  readonly classInput = input<string>('', { alias: 'class' });
  /**
   * Where the menu opens from the pointer: at its reading end (default), its
   * start, above or below it — at another side if there is no room.
   */
  readonly side = input<ScContextMenuSide>('end');

  /** Opened by a pointer: no item highlighted until it moves or a key. */
  readonly quiet = signal(false);
  private readonly directionality = inject(Directionality);
  readonly direction = (): Direction => this.directionality.value;
  readonly lang = (): string | null =>
    this.host.closest('[lang]')?.getAttribute('lang') ?? null;
  private readonly host = inject(ElementRef).nativeElement as HTMLElement;

  private readonly provider = inject(SC_CONTEXT_MENU_PROVIDER);
  private readonly cursorTrigger = viewChild(MenuTrigger);
  private readonly scMenu = contentChild(ScMenu);

  /** Where the provider last saw a right-click. */
  protected readonly position = this.provider.position;

  protected readonly menu = computed(
    () => this.scMenu()?.menu as Menu<unknown> | undefined,
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  /** The element that had focus when the menu opened. */
  private returnFocus: HTMLElement | null = null;

  constructor() {
    // Aria refocuses its trigger on close, but here that is the hidden anchor,
    // so focus would drop to the page. Give it back to where it came from
    // (the trigger area, for a keyboard user) — unless the user has moved it.
    effect(() => {
      if (this.cursorTrigger()?.expanded() !== false || !this.returnFocus) {
        return;
      }
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
            !!this.menu()?.element.contains(active);
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

  /** Opens at the last right-click; `pointer`: by a pointer, not a key. */
  open(pointer = false): void {
    this.returnFocus = this.document.activeElement as HTMLElement | null;
    this.quiet.set(pointer);
    this.cursorTrigger()?.open();
  }

  close(): void {
    const trigger = this.cursorTrigger();
    if (trigger?.expanded()) {
      trigger.close();
    }
  }

  protected onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
