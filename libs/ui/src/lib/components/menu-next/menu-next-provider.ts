import { Directionality } from '@angular/cdk/bidi';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
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
import {
  type ScOverlayAlign,
  buildOverlayPositionsWithFallback,
  cn,
  setInput,
} from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { SC_MENU_NEXT, type ScMenuNextContext } from './menu-next-context';
import { ScMenuNextPortal } from './menu-next-portal';
import { ScMenuNextTrigger } from './menu-next-trigger';

export type ScMenuNextAlign = ScOverlayAlign;
export type ScMenuNextSide = 'top' | 'bottom';

/** Holds the menu: open or not, where it opens; renders it in an overlay. */
@Component({
  selector: 'div[scMenuNextProvider]',
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: SC_MENU_NEXT, useExisting: ScMenuNextProvider },
  ],
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        [cdkConnectedOverlayOpen]="expanded()"
        [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
        [cdkConnectedOverlayPositions]="positions()"
        cdkAttachPopoverAsChild
      >
        <ng-container [ngTemplateOutlet]="menuPortal().templateRef" />
      </ng-template>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMenuNextProvider implements ScMenuNextContext {
  private readonly directionality = inject(Directionality);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Open or not; `[(open)]`. */
  readonly open = model(false);
  readonly side = input<ScMenuNextSide>('bottom');
  readonly align = input<ScMenuNextAlign>('start');
  readonly offset = input(4);
  readonly originInput = input<CdkOverlayOrigin | undefined>(undefined, {
    alias: 'origin',
  });

  readonly quiet = signal(false);
  readonly direction = () => this.directionality.value;
  readonly lang = () =>
    this.host.closest('[lang]')?.getAttribute('lang') ?? null;

  private readonly triggerChild = contentChild(ScMenuNextTrigger);
  protected readonly menuPortal = contentChild.required(ScMenuNextPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.triggerChild()?.overlayOrigin,
  );

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(
      this.side(),
      this.align(),
      this.offset(),
      this.directionality.value,
    ),
  );

  protected readonly expanded = computed(
    () => this.triggerChild()?.trigger.expanded() ?? false,
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // The trigger opens this menu.
    effect(() => {
      const trigger = this.triggerChild()?.trigger;
      const menu = this.menuPortal().menu();
      if (trigger && menu) setInput(trigger.menu, menu);
    });
    // [(open)] follows the trigger…
    effect(() => {
      const expanded = this.expanded();
      untracked(() => this.open.set(expanded));
    });
    // …and opens or closes it.
    effect(() => {
      const open = this.open();
      const trigger = untracked(() => this.triggerChild()?.trigger);
      if (!trigger || open === untracked(trigger.expanded)) return;
      if (open) trigger.open();
      else trigger.close();
    });
  }
}
