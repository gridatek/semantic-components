import { CdkTrapFocus } from '@angular/cdk/a11y';
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
  model,
  signal,
} from '@angular/core';
import {
  type OverlayAlign,
  type OverlaySide,
  buildOverlayPositionsWithFallback,
  cn,
} from '../../utils';
import { ScPopoverPortal } from './popover-portal';
import { ScPopoverTrigger } from './popover-trigger';

export type ScPopoverSide = OverlaySide;
export type ScPopoverAlign = OverlayAlign;

@Component({
  selector: 'div[scPopoverProvider]',
  imports: [OverlayModule, NgTemplateOutlet, CdkTrapFocus],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="overlayOpen()"
        [cdkConnectedOverlayPositions]="positions()"
        (overlayOutsideClick)="close()"
        (overlayKeydown)="onKeydown($event)"
      >
        <div cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
          <ng-container [ngTemplateOutlet]="popoverPortal().templateRef" />
        </div>
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'popover-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPopoverProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Which side the popover appears on */
  readonly side = input<ScPopoverSide>('bottom');

  /** Alignment along the side */
  readonly align = input<ScPopoverAlign>('center');

  /** Vertical/horizontal gap (in pixels) between the trigger and the popover */
  readonly offset = input(4);

  /** Custom overlay origin. Defaults to the trigger element if not provided. */
  readonly originInput = input<CdkOverlayOrigin | undefined>(undefined, {
    alias: 'origin',
  });

  /**
   * Logical state: Controls animation state (open/closed)
   * - When true: Triggers entry animation
   * - When false: Triggers exit animation
   */
  readonly open = model<boolean>(false);

  /**
   * Physical state: Controls DOM presence via cdkConnectedOverlayOpen
   * - When true: Content exists in DOM (can animate)
   * - When false: Content removed from DOM
   * - Stays true during close animation to allow it to complete
   */
  readonly overlayOpen = signal<boolean>(false);

  private readonly triggerChild = contentChild(ScPopoverTrigger);
  protected readonly popoverPortal = contentChild.required(ScPopoverPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.triggerChild()?.overlayOrigin,
  );

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(this.side(), this.align(), this.offset()),
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // Synchronize overlay state with logical state for opening
    effect(() => {
      if (this.open()) {
        // Opening: Mount DOM immediately so animation can start
        this.overlayOpen.set(true);
      }
      // Note: When closing (open = false), overlayOpen stays true
      // until animation completes (handled by onPopoverAnimationComplete)
    });
  }

  close(): void {
    this.open.set(false);
  }

  /**
   * Called by popover when its close animation completes
   */
  onPopoverAnimationComplete(): void {
    if (!this.open()) {
      this.overlayOpen.set(false);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.open.set(false);
    }
  }
}
