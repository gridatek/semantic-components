import { InteractivityChecker, _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  CdkOverlayOrigin,
  type ConnectedOverlayPositionChange,
  Overlay,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DOCUMENT,
  Injector,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScFocusTrap } from '../../utilities/focus-trap';
import { ScOpenDelay } from '../../utils';
import {
  type ScOverlayAlign,
  type ScOverlayLogicalSide,
  type ScOverlaySide,
  buildOverlayPositionsWithFallback,
  physicalSide,
  placedSide,
} from '../../utils/overlay-positions';
import { ScPopoverPortal } from './popover-portal';
import { ScPopoverTrigger } from './popover-trigger';

/** Physical (`left`, `right`, as Base UI's) or logical (`inline-start`, `inline-end`). */
export type ScPopoverSide = ScOverlayLogicalSide;

/**
 * Base UI's `modal`: `false` — the page stays usable, Tab may leave (and
 * closes it); `'trap-focus'` — Tab stays inside; `true` — Tab stays inside,
 * and the page behind neither scrolls nor takes a click.
 */
export type ScPopoverModal = boolean | 'trap-focus';

/**
 * A popover and its trigger: `[(open)]`, `modal`, where it goes (`side`,
 * `alignment`, `sideOffset`, `alignmentOffset`; `origin` for another anchor than the trigger). As Base
 * UI's Popover.Root.
 */
@Component({
  selector: 'div[scPopoverProvider]',
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
        [cdkConnectedOverlayHasBackdrop]="modal() === true"
        cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
        [cdkConnectedOverlayScrollStrategy]="scrollStrategy()"
        (overlayOutsideClick)="onOutsideClick($event)"
        (backdropClick)="close()"
        (overlayKeydown)="onKeydown($event)"
        (positionChange)="onPositionChange($event)"
        (detach)="onDetach()"
      >
        <div [scFocusTrap]="modal() !== false" class="contents">
          <ng-container [ngTemplateOutlet]="portal().templateRef" />
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
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly checker = inject(InteractivityChecker);
  private readonly overlay = inject(Overlay);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown or not. */
  readonly open = model(false);
  /** Whether it holds the focus, and the page (see `ScPopoverModal`). */
  readonly modal = input<ScPopoverModal>(false);
  /** Which side of the anchor it goes on; flips when there is no room. */
  readonly side = input<ScPopoverSide>('bottom');
  /** Along that side: `start`, `center`, `end` (logical). */
  readonly alignment = input<ScOverlayAlign>('center');
  /** The gap from the anchor (px). */
  /** Its distance from the trigger's side, in px (Base UI's `sideOffset`). */
  readonly sideOffset = input(4);
  /** Moved along that side, in px, toward its end (Base UI's `alignOffset`). */
  readonly alignmentOffset = input(0);
  /** Another anchor than the trigger (an input group…). */
  readonly originInput = input<CdkOverlayOrigin | undefined>(undefined, {
    alias: 'origin',
  });

  readonly id = inject(_IdGenerator).getId('sc-popover-');
  /** Its title's and description's ids, registered by those parts. */
  readonly titleId = signal<string | null>(null);
  readonly descriptionId = signal<string | null>(null);

  /** Its trigger, when it has one (a date picker anchors on an input group). */
  readonly trigger = contentChild(ScPopoverTrigger);
  protected readonly portal = contentChild.required(ScPopoverPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.trigger()?.overlayOrigin,
  );

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

  /** Modal: the page behind doesn't scroll; otherwise it follows its anchor. */
  protected readonly scrollStrategy = computed(() =>
    this.modal() === true
      ? this.overlay.scrollStrategies.block()
      : this.overlay.scrollStrategies.reposition(),
  );

  /** Hover opening (the trigger's `openOnHover`). */
  readonly timing = new ScOpenDelay(this.open);
  /** Opened by the pointer's hover: leaving closes it. */
  openedByHover = false;

  protected readonly class = computed(() => cn('contents', this.classInput()));

  close(): void {
    this.timing.cancel();
    this.open.set(false);
  }

  protected onOutsideClick(event: MouseEvent): void {
    // Its own trigger toggles it: not an outside click.
    const anchor = this.origin()?.elementRef.nativeElement as HTMLElement;
    if (anchor?.contains(event.target as Node)) return;
    this.close();
  }

  /** The CDK detached the overlay (it was scrolled away, say): closed. */
  protected onDetach(): void {
    if (this.open()) this.open.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
      return;
    }
    if (event.key === 'Tab' && this.modal() === false) this.leaveByTab(event);
  }

  /**
   * Not modal: Tab out of its last element (or Shift+Tab out of its first)
   * closes it and goes on from the anchor — as Base UI's.
   */
  private leaveByTab(event: KeyboardEvent): void {
    const pane = (event.target as HTMLElement).closest('.cdk-overlay-pane');
    if (!pane) return;
    const inside = this.tabbables(pane);
    const at = inside.indexOf(event.target as HTMLElement);
    const leaving = event.shiftKey ? at <= 0 : at === inside.length - 1;
    if (!leaving) return;
    event.preventDefault();
    const anchor = this.origin()?.elementRef.nativeElement as HTMLElement;
    const page = this.tabbables(this.document.body).filter(
      (el) => !el.closest('.cdk-overlay-container'),
    );
    const next = event.shiftKey
      ? anchor
      : (page.find(
          (el) =>
            !anchor.contains(el) &&
            !!(
              anchor.compareDocumentPosition(el) &
              Node.DOCUMENT_POSITION_FOLLOWING
            ),
        ) ?? anchor);
    this.close();
    afterNextRender(() => next?.focus(), { injector: this.injector });
  }

  private tabbables(root: Element): HTMLElement[] {
    return Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]',
      ),
    ).filter((el) => this.checker.isTabbable(el));
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.placed.set(placedSide(change, this.direction.valueSignal()));
  }
}
