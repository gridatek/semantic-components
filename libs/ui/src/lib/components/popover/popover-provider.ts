import { Directionality } from '@angular/cdk/bidi';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  model,
} from '@angular/core';
import { ScFocusTrap } from '../../utilities';
import {
  type ScOverlayAlign,
  type ScOverlaySide,
  buildOverlayPositionsWithFallback,
  cn,
} from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { ScPopoverPortal } from './popover-portal';
import { ScPopoverTrigger } from './popover-trigger';

export type ScPopoverSide = ScOverlaySide;
export type ScPopoverAlign = ScOverlayAlign;

@Component({
  selector: 'div[scPopoverProvider]',
  providers: [{ provide: Directionality, useClass: ScElementDirectionality }],
  imports: [OverlayModule, NgTemplateOutlet, ScFocusTrap],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayPositions]="positions()"
        [cdkConnectedOverlayDisableClose]="true"
        (overlayOutsideClick)="close()"
        (overlayKeydown)="onKeydown($event)"
        (detach)="onDetach()"
      >
        <div scFocusTrap>
          <ng-container [ngTemplateOutlet]="popoverPortal().templateRef" />
        </div>
      </ng-template>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPopoverProvider {
  private readonly direction = inject(Directionality);
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

  /** Shown or not; the popover animates in and out (`animate.enter` / `animate.leave`). */
  readonly open = model<boolean>(false);

  private readonly triggerChild = contentChild(ScPopoverTrigger);
  protected readonly popoverPortal = contentChild.required(ScPopoverPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.triggerChild()?.overlayOrigin,
  );

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(
      this.side(),
      this.align(),
      this.offset(),
      this.direction.value,
    ),
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  close(): void {
    this.open.set(false);
  }

  /** The CDK detached the overlay (it was scrolled away, say): closed. */
  protected onDetach(): void {
    if (this.open()) this.open.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.open.set(false);
    }
  }
}
