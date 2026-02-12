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
import { ScContextMenuSub } from './context-menu-sub';
import { ScContextMenuSubTrigger } from './context-menu-sub-trigger';

const positions: ConnectedPosition[] = [
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -4,
  },
];

@Component({
  selector: 'div[sc-context-menu-sub-content]',
  imports: [OverlayModule],
  template: `
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger.overlayOrigin"
      [cdkConnectedOverlayOpen]="submenu.open()"
      [cdkConnectedOverlayPositions]="positions"
    >
      <div
        [class]="contentClass()"
        role="menu"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'context-menu-sub-content',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuSubContent {
  readonly submenu = inject(ScContextMenuSub);
  readonly trigger = inject(ScContextMenuSubTrigger);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly positions = positions;

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly contentClass = computed(() =>
    cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
      this.submenu.open()
        ? 'opacity-100 scale-100 transition-[opacity,transform] duration-150 ease-out'
        : 'opacity-0 scale-95 transition-[opacity,transform] duration-150 ease-in',
    ),
  );

  onMouseEnter(): void {
    this.trigger.cancelHide();
  }

  onMouseLeave(): void {
    this.submenu.hide();
  }
}
