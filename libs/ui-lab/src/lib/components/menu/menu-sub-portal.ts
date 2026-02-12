import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ScMenuSubProvider } from './menu-sub-provider';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-menu-sub-portal]',
  imports: [OverlayModule],
  template: `
    @if (origin(); as origin) {
      <ng-template
        [cdkConnectedOverlayOpen]="expanded()"
        [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
        [cdkConnectedOverlayPositions]="[
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 4,
          },
        ]"
        cdkAttachPopoverAsChild
      >
        <ng-content />
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'menu-sub-portal',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuSubPortal {
  private readonly scMenuSub = inject(ScMenuSubProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly origin = computed(() => this.scMenuSub.origin());
  protected readonly expanded = computed(
    () => this.scMenuSub.menuItem()?.expanded() ?? false,
  );

  protected readonly class = computed(() => cn('', this.classInput()));
}
