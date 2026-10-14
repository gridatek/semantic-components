import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  input,
  signal,
} from '@angular/core';
import {
  type ScOverlayAlign,
  type ScOverlaySide,
  buildOverlayPositionsWithFallback,
  cn,
} from '../../utils';
import { ScHoverCardPortal } from './hover-card-portal';
import { ScHoverCardTrigger } from './hover-card-trigger';

export type ScHoverCardSide = ScOverlaySide;
export type ScHoverCardAlign = ScOverlayAlign;

@Component({
  selector: 'div[scHoverCardProvider]',
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayPositions]="positions()"
        (detach)="onDetach()"
      >
        <ng-container [ngTemplateOutlet]="hoverCardPortal().templateRef" />
      </ng-template>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
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

  /** Shown or not; the hover card animates in and out (`animate.enter` / `animate.leave`). */
  readonly open = signal<boolean>(false);

  private readonly triggerChild = contentChild(ScHoverCardTrigger);
  protected readonly hoverCardPortal = contentChild.required(ScHoverCardPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.triggerChild()?.overlayOrigin,
  );

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(this.side(), this.align(), this.offset()),
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  show(): void {
    this.open.set(true);
  }

  hide(): void {
    this.open.set(false);
  }

  /** The CDK detached the overlay itself (Escape): closed. */
  protected onDetach(): void {
    if (this.open()) this.open.set(false);
  }

  /** Cancel pending hide timeout on the trigger */
  cancelTriggerHide(): void {
    this.triggerChild()?.cancelHide();
  }
}
