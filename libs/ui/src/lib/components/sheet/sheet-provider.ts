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
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from 'cn';
import { ScFocusTrap } from '../../utilities';
import { elementDirection } from '../../utils';
import {
  type ScOverlayLogicalSide,
  type ScOverlaySide,
  physicalSide,
} from '../../utils/overlay-positions';
import { ScBackdrop } from '../backdrop';
import { ScSheetPortal } from './sheet-portal';

/** Physical (`top`, `right`, `bottom`, `left`) or logical (`inline-start`, `inline-end`). */
export type ScSheetSide = ScOverlayLogicalSide;

/**
 * A sheet: a dialog at the edge of the screen. `[(open)]`, `side` (right by
 * default). Its panel slides in from that side over a backdrop; focus is
 * trapped in it and given back as it closes; Escape or a press on the
 * backdrop closes it. As shadcn's Sheet (Base UI's Dialog).
 */
@Component({
  selector: 'div[scSheetProvider]',
  imports: [OverlayModule, ScBackdrop, ScFocusTrap, NgTemplateOutlet],
  template: `
    <ng-content />
    <ng-template #overlayTemplate>
      <div scBackdrop></div>
      <div scFocusTrap>
        <ng-container [ngTemplateOutlet]="portal().templateRef" />
      </div>
    </ng-template>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSheetProvider {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown or not; the panel and backdrop animate in and out. */
  readonly open = model(false);
  /** The edge it comes from; the reading end by default (the right, the left in RTL). */
  readonly side = input<ScSheetSide>('inline-end');

  /**
   * The direction and language of where the sheet was opened from: it is
   * rendered at the end of the page, outside them.
   */
  readonly direction = (): 'ltr' | 'rtl' => elementDirection(this.host);
  readonly lang = (): string | null =>
    this.host.closest('[lang]')?.getAttribute('lang') ?? null;

  /** The side as the screen sees it (what the preset reads, `data-side`). */
  readonly physicalSide = computed<ScOverlaySide>(() =>
    physicalSide(this.side(), this.direction()),
  );

  readonly id = inject(_IdGenerator).getId('sc-sheet-');
  /** Its title's and description's ids, registered by those parts. */
  readonly titleId = signal<string | null>(null);
  readonly descriptionId = signal<string | null>(null);

  private readonly overlayTemplate =
    viewChild.required<TemplateRef<unknown>>('overlayTemplate');
  protected readonly portal = contentChild.required(ScSheetPortal);

  private overlayRef: OverlayRef | null = null;

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // Detached on close: Angular keeps the parts until they've animated out.
    effect(() => {
      if (this.open()) this.attach();
      else this.detach();
    });
    inject(DestroyRef).onDestroy(() => this.overlayRef?.dispose());
  }

  close(): void {
    this.open.set(false);
  }

  private attach(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global(),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });
      this.overlayRef.backdropClick().subscribe(() => this.close());
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
  }
}
