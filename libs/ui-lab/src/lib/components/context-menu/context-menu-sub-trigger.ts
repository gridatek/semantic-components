import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { ScContextMenuSub } from './context-menu-sub';

@Component({
  selector: 'div[scContextMenuSubTrigger]',
  imports: [SiChevronRightIcon],
  hostDirectives: [CdkOverlayOrigin],
  template: `
    <ng-content />
    <svg siChevronRightIcon class="ml-auto size-4" aria-hidden="true"></svg>
  `,
  host: {
    'data-slot': 'context-menu-sub-trigger',
    role: 'menuitem',
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': 'submenu.open()',
    '[attr.data-state]': 'submenu.open() ? "open" : "closed"',
    '[class]': 'class()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuSubTrigger {
  readonly submenu = inject(ScContextMenuSub);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  constructor() {
    this.submenu.overlayOrigin = this.overlayOrigin;
    this.submenu.cancelTriggerHide = () => this.cancelHide();
  }

  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  protected readonly class = computed(() =>
    cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      this.classInput(),
    ),
  );

  onMouseEnter(): void {
    this.cancelHide();
    this.showTimeout = setTimeout(() => {
      this.submenu.show();
    }, 100);
  }

  onMouseLeave(): void {
    this.cancelShow();
    this.hideTimeout = setTimeout(() => {
      this.submenu.hide();
    }, 100);
  }

  private cancelShow(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }

  cancelHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
