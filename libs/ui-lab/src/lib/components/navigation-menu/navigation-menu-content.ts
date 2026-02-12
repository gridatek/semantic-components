import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenuItem } from './navigation-menu-item';

const position: ConnectedPosition = {
  originX: 'start',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'top',
  offsetY: 4,
};

@Component({
  selector: 'div[sc-navigation-menu-content]',
  imports: [OverlayModule],
  template: `
    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="menuItem.open()"
        [cdkConnectedOverlayPositions]="[position]"
      >
        <div
          [class]="contentClass()"
          (mouseenter)="onMouseEnter()"
          (mouseleave)="onMouseLeave()"
        >
          <ng-content />
        </div>
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'navigation-menu-content',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuContent {
  readonly menuItem = inject(ScNavigationMenuItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly position = position;

  protected readonly origin = computed(() => this.menuItem.origin());

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly contentClass = computed(() =>
    cn(
      'left-0 top-0 w-full md:absolute md:w-auto',
      'bg-popover text-popover-foreground',
      'rounded-md border shadow-lg',
      'overflow-hidden',
      'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out',
      'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
      'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
      'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
      '**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
    ),
  );

  onMouseEnter(): void {
    this.menuItem.cancelHide();
  }

  onMouseLeave(): void {
    this.menuItem.onMouseLeave();
  }
}
