import { NgTemplateOutlet } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
import { ScMenuTrigger } from './menu-trigger';
import { ScMenuPortal } from './menu-portal';

@Component({
  selector: 'div[scMenuProvider]',
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        [cdkConnectedOverlayOpen]="expanded()"
        [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
        [cdkConnectedOverlayPositions]="[
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
          },
        ]"
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

  private readonly triggerChild = contentChild(ScMenuTrigger);
  protected readonly menuPortal = contentChild.required(ScMenuPortal);

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);
  readonly trigger = computed(() => this.triggerChild()?.trigger);
  readonly menu = computed(() => this.menuPortal()?.menu());

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
