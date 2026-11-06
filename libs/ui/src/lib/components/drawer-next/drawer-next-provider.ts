import { _IdGenerator } from '@angular/cdk/a11y';
import { Overlay, OverlayModule, type OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  booleanAttribute,
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
import { ScFocusTrap } from '../../utilities';
import { cn, elementDirection } from '../../utils';
import { ScBackdrop } from '../backdrop';
import { ScDrawerNextPortal } from './drawer-next-portal';

/** The way a swipe dismisses it — and so the edge it sits at. */
export type ScDrawerNextSwipeDirection =
  'down' | 'up' | 'left' | 'right' | 'inline-start' | 'inline-end';

/** As the screen sees it. */
export type ScDrawerNextPhysicalDirection = 'down' | 'up' | 'left' | 'right';

/**
 * Base UI's `modal`: `true` — a backdrop, focus held, the page still;
 * `'trap-focus'` — focus held, the page usable; `false` — neither.
 */
export type ScDrawerNextModal = boolean | 'trap-focus';

/**
 * A drawer: a panel at the edge of the screen that a swipe dismisses — or
 * moves between its snap points. `[(open)]`, `swipeDirection` (down by
 * default), `snapPoints` and `[(snapPoint)]`, `modal`,
 * `disablePointerDismissal`. A drawer opened inside another stacks on it.
 * As Base UI's Drawer.
 */
@Component({
  selector: 'div[scDrawerNextProvider]',
  imports: [OverlayModule, ScBackdrop, ScFocusTrap, NgTemplateOutlet],
  template: `
    <ng-content />
    <ng-template #overlayTemplate>
      @if (modal() === true) {
        <div scBackdrop></div>
      }
      <div [scFocusTrap]="modal() !== false">
        <ng-container [ngTemplateOutlet]="portal().templateRef" />
      </div>
    </ng-template>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDrawerNextProvider {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  /** The drawer this one was opened from, if any: it stacks behind. */
  private readonly parent = inject(ScDrawerNextProvider, {
    optional: true,
    skipSelf: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown or not; it slides in and out from its edge. */
  readonly open = model(false);
  /** The way a swipe dismisses it, and the edge it sits at. */
  readonly swipeDirection = input<ScDrawerNextSwipeDirection>('down');
  /**
   * Heights it rests at: fractions of the screen (0–1) or pixels (above 1),
   * smallest first. Dragging moves between them.
   */
  readonly snapPoints = input<readonly number[] | null>(null);
  /** The snap point it rests at (one of `snapPoints`); the first when opened. */
  readonly snapPoint = model<number | null>(null);
  /** Whether it holds focus and the page (see `ScDrawerNextModal`). */
  readonly modal = input<ScDrawerNextModal>(true);
  /** A press outside doesn't close it. */
  readonly disablePointerDismissal = input(false, {
    transform: booleanAttribute,
  });

  /**
   * The direction and language of where the drawer was opened from: it is
   * rendered at the end of the page, outside them.
   */
  readonly direction = (): 'ltr' | 'rtl' => elementDirection(this.host);
  readonly lang = (): string | null =>
    this.host.closest('[lang]')?.getAttribute('lang') ?? null;

  readonly physicalDirection = computed<ScDrawerNextPhysicalDirection>(() => {
    const d = this.swipeDirection();
    if (d !== 'inline-start' && d !== 'inline-end') return d;
    return (d === 'inline-start') !== (this.direction() === 'rtl')
      ? 'left'
      : 'right';
  });
  readonly axis = computed(() =>
    this.physicalDirection() === 'down' || this.physicalDirection() === 'up'
      ? 'y'
      : 'x',
  );
  readonly hasSnapPoints = computed(() => !!this.snapPoints()?.length);

  readonly id = inject(_IdGenerator).getId('sc-drawer-');
  /** Its title's and description's ids, registered by those parts. */
  readonly titleId = signal<string | null>(null);
  readonly descriptionId = signal<string | null>(null);
  /** Drawers open on top of this one. */
  readonly nestedOpen = signal(0);

  private readonly overlayTemplate =
    viewChild.required<TemplateRef<unknown>>('overlayTemplate');
  protected readonly portal = contentChild.required(ScDrawerNextPortal);

  private overlayRef: OverlayRef | null = null;

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // Detached on close: Angular keeps the parts until they've animated out.
    effect(() => {
      if (this.open()) untracked(() => this.attach());
      else untracked(() => this.detach());
    });
    // Opening: at its first snap point.
    effect(() => {
      const points = this.snapPoints();
      if (this.open() && points?.length && untracked(this.snapPoint) === null)
        untracked(() => this.snapPoint.set(points[0]));
    });
    // Stacked: the drawer behind knows.
    let counted = false;
    effect(() => {
      const open = this.open();
      untracked(() => {
        if (!this.parent || open === counted) return;
        counted = open;
        this.parent.nestedOpen.update((n) => n + (open ? 1 : -1));
      });
    });
    inject(DestroyRef).onDestroy(() => {
      if (counted) this.parent?.nestedOpen.update((n) => n - 1);
      this.overlayRef?.dispose();
    });
  }

  close(): void {
    this.open.set(false);
  }

  /** The snap point after the one it rests at, round to the first. */
  nextSnapPoint(): void {
    const points = this.snapPoints();
    if (!points?.length) return;
    const at = points.indexOf(this.snapPoint() ?? points[0]);
    this.snapPoint.set(points[(at + 1) % points.length]);
  }

  /** A snap point's visible height, in pixels. */
  snapHeight(point: number): number {
    return point <= 1 ? point * window.innerHeight : point;
  }

  private attach(): void {
    if (!this.overlayRef) {
      const modal = this.modal() === true;
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global(),
        hasBackdrop: modal,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        scrollStrategy: modal
          ? this.overlay.scrollStrategies.block()
          : this.overlay.scrollStrategies.noop(),
      });
      this.overlayRef.backdropClick().subscribe(() => {
        if (!this.disablePointerDismissal()) this.close();
      });
      this.overlayRef.outsidePointerEvents().subscribe((event) => {
        // Not modal: a press outside closes it — unless asked not to, or on
        // its own trigger (which toggles it).
        if (this.modal() === true || this.disablePointerDismissal()) return;
        if (this.host.contains(event.target as Node)) return;
        this.close();
      });
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') this.close();
      });
    }
    if (!this.overlayRef.hasAttached())
      this.overlayRef.attach(
        new TemplatePortal(this.overlayTemplate(), this.viewContainerRef),
      );
  }

  private detach(): void {
    if (this.overlayRef?.hasAttached()) this.overlayRef.detach();
    this.snapPoint.set(null);
  }
}
