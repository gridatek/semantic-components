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
import { cn } from 'cn';
import {
  type ScOverlayAlign,
  buildOverlayPositionsWithFallback,
  setInput,
} from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { SC_MENU, type ScMenuContext } from './menu-context';
import { ScMenuPortal } from './menu-portal';
import { ScMenuTrigger } from './menu-trigger';

export type ScMenuAlign = ScOverlayAlign;
export type ScMenuSide = 'top' | 'bottom';

/** Holds the menu: open or not, where it opens; renders it in an overlay. */
@Component({
  selector: 'div[scMenuProvider]',
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: SC_MENU, useExisting: ScMenuProvider },
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
export class ScMenuProvider implements ScMenuContext {
  private readonly directionality = inject(Directionality);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Open or not; `[(open)]`. */
  readonly open = model(false);
  readonly side = input<ScMenuSide>('bottom');
  readonly alignment = input<ScMenuAlign>('start');
  readonly offset = input(4);
  readonly originInput = input<CdkOverlayOrigin | undefined>(undefined, {
    alias: 'origin',
  });

  readonly quiet = signal(false);
  readonly direction = () => this.directionality.value;
  readonly lang = () =>
    this.host.closest('[lang]')?.getAttribute('lang') ?? null;

  private readonly triggerChild = contentChild(ScMenuTrigger);
  protected readonly menuPortal = contentChild.required(ScMenuPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.triggerChild()?.overlayOrigin,
  );

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(
      this.side(),
      this.alignment(),
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
