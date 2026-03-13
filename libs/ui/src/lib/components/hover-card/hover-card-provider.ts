import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  input,
  signal,
} from '@angular/core';
import {
  type OverlayAlign,
  type OverlaySide,
  buildOverlayPositionsWithFallback,
  cn,
} from '../../utils';
import { ScHoverCardPortal } from './hover-card-portal';
import { ScHoverCardTrigger } from './hover-card-trigger';

export type ScHoverCardSide = OverlaySide;
export type ScHoverCardAlign = OverlayAlign;

@Component({
  selector: 'div[scHoverCardProvider]',
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="overlayOpen()"
        [cdkConnectedOverlayPositions]="positions()"
      >
        <ng-container [ngTemplateOutlet]="hoverCardPortal().templateRef" />
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'hover-card-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScHoverCardProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Which side the hover card appears on */
  readonly side = input<ScHoverCardSide>('bottom');

  /** Alignment along the side */
  readonly align = input<ScHoverCardAlign>('center');

  /** Gap (in pixels) between the trigger and the hover card */
  readonly offset = input(4);

  /** Custom overlay origin. Defaults to the trigger element if not provided. */
  readonly originInput = input<CdkOverlayOrigin | undefined>(undefined, {
    alias: 'origin',
  });

  /** Delay before showing hover card (ms) */
  readonly openDelay = input<number>(700);

  /** Delay before hiding hover card (ms) */
  readonly closeDelay = input<number>(300);

  /** Whether the hover card is logically open (controls animation state) */
  readonly open = signal<boolean>(false);

  /** Whether the overlay should be physically open (stays true during close animation) */
  readonly overlayOpen = signal<boolean>(false);

  private readonly triggerChild = contentChild(ScHoverCardTrigger);
  protected readonly hoverCardPortal = contentChild.required(ScHoverCardPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.triggerChild()?.overlayOrigin,
  );

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(this.side(), this.align(), this.offset()),
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // When opening, open overlay immediately
    effect(() => {
      if (this.open()) {
        this.overlayOpen.set(true);
      }
    });
  }

  show(): void {
    this.open.set(true);
  }

  hide(): void {
    this.open.set(false);
    // overlayOpen will be set to false by onAnimationComplete
  }

  /** Called by hover-card when close animation completes */
  onAnimationComplete(): void {
    this.overlayOpen.set(false);
  }

  /** Cancel pending hide timeout on the trigger */
  cancelTriggerHide(): void {
    this.triggerChild()?.cancelHide();
  }
}
