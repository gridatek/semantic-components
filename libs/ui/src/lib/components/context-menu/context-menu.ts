import { Menu, MenuTrigger } from '@angular/aria/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { ScMenu } from '../menu';
import { SC_CONTEXT_MENU_PROVIDER } from './context-menu-types';

/**
 * Holds the menu for a context menu: an anchor element parked at the pointer,
 * and the overlay that positions the menu against it.
 *
 * The anchor exists because an overlay needs something to attach to, and a
 * pointer is not an element. Moving it is what places the menu, and going
 * through the overlay is what makes the menu flip near a viewport edge,
 * dismiss on an outside click, and close on Escape.
 */
@Component({
  selector: 'div[scContextMenu]',
  imports: [MenuTrigger, OverlayModule],
  template: `
    <div
      #triggerEl
      ngMenuTrigger
      #trigger="ngMenuTrigger"
      [menu]="menu()"
      style="position: fixed; visibility: hidden"
      [style.left.px]="position().x"
      [style.top.px]="position().y"
    ></div>

    <ng-template
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      [cdkConnectedOverlay]="{
        origin: triggerEl,
        usePopover: 'inline',
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
      }"
      (backdropClick)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
      cdkAttachPopoverAsChild
    >
      <ng-content />
    </ng-template>
  `,
  host: {
    'data-slot': 'context-menu',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScContextMenu {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly provider = inject(SC_CONTEXT_MENU_PROVIDER);
  private readonly cursorTrigger = viewChild(MenuTrigger);
  private readonly scMenu = contentChild(ScMenu);

  /** Where the provider last saw a right-click. */
  protected readonly position = this.provider.position;

  protected readonly menu = computed(
    () => this.scMenu()?.menu as Menu<unknown> | undefined,
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  open(): void {
    this.cursorTrigger()?.open();
  }

  close(): void {
    const trigger = this.cursorTrigger();
    if (trigger?.expanded()) {
      trigger.close();
    }
  }

  protected onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
