import { Directionality } from '@angular/cdk/bidi';
import {
  CdkOverlayOrigin,
  type ConnectedOverlayPositionChange,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ScOpenDelay, cn } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import {
  type ScOverlayAlign,
  type ScOverlayLogicalSide,
  type ScOverlaySide,
  buildOverlayPositionsWithFallback,
  physicalSide,
  placedSide,
  sideInWords,
} from '../../utils/overlay-positions';
import { ScPreviewCardPortal } from './preview-card-portal';
import { ScPreviewCardTrigger } from './preview-card-trigger';

/** Physical (`left`, `right`, as Base UI's) or logical (`inline-start`, `inline-end`). */
export type ScPreviewCardSide = ScOverlayLogicalSide;

/**
 * A preview card and its trigger: `[(open)]`, where it goes (`side`, `align`,
 * `offset`; `origin` for another anchor than the trigger). A preview of the
 * link's destination for sighted mouse and keyboard users — nothing in it is
 * reached by the keyboard or a screen reader. As Base UI's PreviewCard.Root.
 */
@Component({
  selector: 'div[scPreviewCardProvider]',
  providers: [{ provide: Directionality, useClass: ScElementDirectionality }],
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayPositions]="positions()"
        [cdkConnectedOverlayDisableClose]="true"
        (overlayOutsideClick)="onOutsideClick($event)"
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
export class ScPreviewCardProvider {
  private readonly direction = inject(Directionality);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown or not. */
  readonly open = model(false);
  /** Which side of the trigger it goes on; flips when there is no room. */
  readonly side = input<ScPreviewCardSide>('bottom');
  /** Along that side: `start`, `center`, `end` (logical). */
  readonly align = input<ScOverlayAlign>('center');
  /** The gap from the trigger (px). */
  readonly offset = input(4);
  /** Another anchor than the trigger. */
  readonly originInput = input<CdkOverlayOrigin | undefined>(undefined, {
    alias: 'origin',
  });

  protected readonly trigger = contentChild(ScPreviewCardTrigger);
  protected readonly portal = contentChild.required(ScPreviewCardPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.trigger()?.overlayOrigin,
  );

  /** Opening and closing after the trigger's delays. */
  readonly timing = new ScOpenDelay(this.open);

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(
      physicalSide(this.side(), this.direction.value),
      this.align(),
      this.offset(),
      this.direction.value,
    ),
  );

  /** The side it was placed on, after any flip — in the words asked for. */
  private readonly placed = signal<ScOverlaySide | null>(null);
  readonly placedSide = computed(() =>
    sideInWords(
      this.placed() ?? physicalSide(this.side(), this.direction.value),
      this.side(),
      this.direction.value,
    ),
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  /** The pointer is on the card: it stays. */
  keepOpen(): void {
    this.timing.cancel();
  }

  /** Closes after the trigger's close delay — time to move onto the card. */
  hideSoon(): void {
    this.timing.closeSoon(this.trigger()?.closeDelay() ?? 300);
  }

  hide(): void {
    this.timing.cancel();
    if (this.open()) this.open.set(false);
  }

  protected onOutsideClick(event: MouseEvent): void {
    const origin = this.origin()?.elementRef.nativeElement as
      HTMLElement | undefined;
    if (origin?.contains(event.target as Node)) return;
    this.hide();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.hide();
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.placed.set(placedSide(change, this.direction.value));
  }
}
