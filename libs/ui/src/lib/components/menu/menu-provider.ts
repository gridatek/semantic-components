import {
  CdkOverlayOrigin,
  ConnectedPosition,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  input,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
import { ScMenuPortal } from './menu-portal';
import { ScMenuTrigger } from './menu-trigger';

export type ScMenuAlign = 'start' | 'center' | 'end';
export type ScMenuSide = 'top' | 'bottom';

@Component({
  selector: 'div[scMenuProvider]',
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
    'data-slot': 'menu-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuProvider {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly side = input<ScMenuSide>('bottom');
  readonly align = input<ScMenuAlign>('start');
  readonly offset = input(4);
  readonly originInput = input<CdkOverlayOrigin | undefined>(undefined, {
    alias: 'origin',
  });

  private readonly triggerChild = contentChild(ScMenuTrigger);
  protected readonly menuPortal = contentChild.required(ScMenuPortal);

  readonly origin = computed(
    () => this.originInput() ?? this.triggerChild()?.overlayOrigin,
  );
  readonly trigger = computed(() => this.triggerChild()?.trigger);
  readonly menu = computed(() => this.menuPortal()?.menu());

  protected readonly positions = computed(() => {
    const x = this.align();
    const gap = this.offset();
    const isBottom = this.side() === 'bottom';
    return [
      // Preferred position
      {
        originX: x,
        originY: isBottom ? 'bottom' : 'top',
        overlayX: x,
        overlayY: isBottom ? 'top' : 'bottom',
        offsetY: isBottom ? gap : -gap,
      },
      // Fallback: opposite side
      {
        originX: x,
        originY: isBottom ? 'top' : 'bottom',
        overlayX: x,
        overlayY: isBottom ? 'bottom' : 'top',
        offsetY: isBottom ? -gap : gap,
      },
    ] as ConnectedPosition[];
  });

  protected readonly expanded = computed(
    () => this.triggerChild()?.trigger?.expanded() ?? false,
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // Auto-connect trigger to menu
    effect(() => {
      const trigger = this.triggerChild()?.trigger;
      const menu = this.menuPortal()?.menu();
      if (trigger && menu) {
        signalSetFn(trigger.menu[SIGNAL], menu);
      }
    });
  }
}
