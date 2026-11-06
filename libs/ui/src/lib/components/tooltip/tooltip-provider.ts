import { _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  type ConnectedOverlayPositionChange,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import {
  type ScOverlayAlign,
  type ScOverlaySide,
  buildOverlayPositionsWithFallback,
} from '../../utils/overlay-positions';
import { ScTooltipGroup } from './tooltip-group';
import { ScTooltipPortal } from './tooltip-portal';
import { ScTooltipTrigger } from './tooltip-trigger';

/** Physical (`left`, `right`, as Base UI's) or logical (`inline-start`, `inline-end`). */
export type ScTooltipSide = ScOverlaySide | 'inline-start' | 'inline-end';

/** The pointer's grace to cross from the trigger to the tooltip (ms). */
const HOVER_BRIDGE = 100;

/**
 * A tooltip and its trigger: `[(open)]`, where it goes (`side`, `align`,
 * `offset`) and when (`delay`, `closeDelay`). As Base UI's Tooltip.Root.
 */
@Component({
  selector: 'div[scTooltipProvider]',
  providers: [{ provide: Directionality, useClass: ScElementDirectionality }],
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (trigger(); as trigger) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="trigger.overlayOrigin"
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayPositions]="positions()"
        [cdkConnectedOverlayDisableClose]="true"
        (overlayKeydown)="onKeydown($event)"
        (positionChange)="onPositionChange($event)"
        (detach)="hide()"
      >
        <ng-container [ngTemplateOutlet]="portal().templateRef" />
      </ng-template>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTooltipProvider {
  private readonly direction = inject(Directionality);
  private readonly group = inject(ScTooltipGroup, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown or not. */
  readonly open = model(false);
  /** Which side of the trigger it goes on; flips when there is no room. */
  readonly side = input<ScTooltipSide>('top');
  /** Along that side: `start`, `center`, `end` (logical). */
  readonly align = input<ScOverlayAlign>('center');
  /** The gap from the trigger (px). */
  readonly offset = input(4);
  /** How long the pointer rests on the trigger before it opens (ms). */
  readonly delay = input(600);
  /** How long it stays once the pointer has left (ms). */
  readonly closeDelay = input(0);
  /** Never opens. */
  readonly disabled = input(false);

  readonly id = inject(_IdGenerator).getId('sc-tooltip-');

  protected readonly trigger = contentChild(ScTooltipTrigger);
  protected readonly portal = contentChild.required(ScTooltipPortal);

  /** The side asked for, as the screen sees it. */
  private readonly physicalSide = computed<ScOverlaySide>(() => {
    const side = this.side();
    if (side !== 'inline-start' && side !== 'inline-end') return side;
    const rtl = this.direction.value === 'rtl';
    return (side === 'inline-start') !== rtl ? 'left' : 'right';
  });

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(
      this.physicalSide(),
      this.align(),
      this.offset(),
      this.direction.value,
    ),
  );

  /** The side it was placed on, after any flip — in the words asked for. */
  private readonly placed = signal<ScOverlaySide | null>(null);
  readonly placedSide = computed<ScTooltipSide>(() => {
    const placed = this.placed() ?? this.physicalSide();
    const side = this.side();
    if (
      (side !== 'inline-start' && side !== 'inline-end') ||
      placed === 'top' ||
      placed === 'bottom'
    )
      return placed;
    const rtl = this.direction.value === 'rtl';
    return (placed === 'left') !== rtl ? 'inline-start' : 'inline-end';
  });

  protected readonly class = computed(() => cn('contents', this.classInput()));

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    // The group knows which of its tooltips are open.
    let wasOpen = false;
    effect(() => {
      const open = this.open();
      untracked(() => {
        if (open === wasOpen) return;
        wasOpen = open;
        if (open) this.group?.opened(this);
        else this.group?.closed(this);
      });
    });
    // Disabled while open: closed.
    effect(() => {
      if (this.disabled()) untracked(() => this.hide());
    });
  }

  /** Opens after the delay — at once when its group is warm. */
  showSoon(): void {
    if (this.disabled()) return;
    clearTimeout(this.timer);
    const delay = this.group?.warm() ? 0 : this.delay();
    if (delay <= 0) this.show();
    else this.timer = setTimeout(() => this.show(), delay);
  }

  show(): void {
    if (this.disabled()) return;
    clearTimeout(this.timer);
    this.open.set(true);
  }

  /** Closes after the close delay — time to move onto the tooltip. */
  hideSoon(): void {
    clearTimeout(this.timer);
    if (!this.open()) return;
    this.timer = setTimeout(
      () => this.hide(),
      Math.max(this.closeDelay(), HOVER_BRIDGE),
    );
  }

  /** The pointer is on the tooltip: it stays. */
  keepOpen(): void {
    clearTimeout(this.timer);
  }

  hide(): void {
    clearTimeout(this.timer);
    if (this.open()) this.open.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.hide();
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    const { originX, originY, overlayX, overlayY } = change.connectionPair;
    let side: ScOverlaySide;
    if (originY === 'top' && overlayY === 'bottom') side = 'top';
    else if (originY === 'bottom' && overlayY === 'top') side = 'bottom';
    else {
      // Horizontal: CDK's start and end follow the direction.
      const toEnd = originX === 'end' && overlayX === 'start';
      const rtl = this.direction.value === 'rtl';
      side = toEnd !== rtl ? 'right' : 'left';
    }
    this.placed.set(side);
  }
}
