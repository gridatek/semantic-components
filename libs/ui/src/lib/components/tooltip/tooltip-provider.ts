import { _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  type ConnectedOverlayPositionChange,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
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
import { cn } from 'cn';
import { ScOpenDelay } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import {
  type ScOverlayAlign,
  type ScOverlayLogicalSide,
  type ScOverlaySide,
  buildOverlayPositionsWithFallback,
  physicalSide,
  placedSide,
} from '../../utils/overlay-positions';
import { SC_TOOLTIP_CONTEXT, type ScTooltipContext } from './tooltip-context';
import { ScTooltipGroup } from './tooltip-group';
import { ScTooltipPortal } from './tooltip-portal';
import { ScTooltipTrigger } from './tooltip-trigger';

/** Physical (`left`, `right`, as Base UI's) or logical (`inline-start`, `inline-end`). */
export type ScTooltipSide = ScOverlayLogicalSide;

/**
 * A tooltip and its trigger: `[(open)]`, where it goes (`side`, `alignment`,
 * `sideOffset`, `alignmentOffset`) and when (`delay`, `closeDelay`). As Base UI's Tooltip.Root.
 */
@Component({
  selector: 'div[scTooltipProvider]',
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: SC_TOOLTIP_CONTEXT, useExisting: ScTooltipProvider },
  ],
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
export class ScTooltipProvider implements ScTooltipContext {
  private readonly direction = inject(Directionality);
  private readonly group = inject(ScTooltipGroup, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown or not. */
  readonly open = model(false);
  /** Which side of the trigger it goes on; flips when there is no room. */
  readonly side = input<ScTooltipSide>('top');
  /** Along that side: `start`, `center`, `end` (logical). */
  readonly alignment = input<ScOverlayAlign>('center');
  /** The gap from the trigger (px). */
  /** Its distance from the trigger's side, in px (Base UI's `sideOffset`). */
  readonly sideOffset = input(4);
  /** Moved along that side, in px, toward its end (Base UI's `alignOffset`). */
  readonly alignmentOffset = input(0);
  /** How long the pointer rests on the trigger before it opens (ms). */
  readonly delay = input(600);
  /** How long it stays once the pointer has left (ms). */
  readonly closeDelay = input(0);
  /** Never opens. */
  readonly disabled = input(false);

  readonly id = inject(_IdGenerator).getId('sc-tooltip-');

  protected readonly trigger = contentChild(ScTooltipTrigger);
  protected readonly portal = contentChild.required(ScTooltipPortal);

  private readonly timing = new ScOpenDelay(this.open);

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(
      physicalSide(this.side(), this.direction.valueSignal()),
      this.alignment(),
      this.sideOffset(),
      this.direction.valueSignal(),
      this.alignmentOffset(),
    ),
  );

  /** The side it was placed on, after any flip, as the screen sees it (`data-side`: physical). */
  private readonly placed = signal<ScOverlaySide | null>(null);
  readonly placedSide = computed(
    () =>
      this.placed() ?? physicalSide(this.side(), this.direction.valueSignal()),
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
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
    this.timing.openSoon(this.group?.warm() ? 0 : this.delay());
  }

  show(): void {
    if (this.disabled()) return;
    this.timing.cancel();
    this.open.set(true);
  }

  /** Closes after the close delay — time to move onto the tooltip. */
  hideSoon(): void {
    this.timing.closeSoon(this.closeDelay());
  }

  /** The pointer is on the tooltip: it stays. */
  keepOpen(): void {
    this.timing.cancel();
  }

  hide(): void {
    this.timing.cancel();
    if (this.open()) this.open.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.hide();
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.placed.set(placedSide(change, this.direction.valueSignal()));
  }
}
