import { Menu, MenuBar, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_CONTEXT_MENU_PROVIDER } from '../context-menu/context-menu-types';
import { ScMenuPortal } from './menu-portal';

@Directive({
  selector: '[scMenu]',
  exportAs: 'scMenu',
  hostDirectives: [
    {
      directive: Menu,
      inputs: ['id', 'wrap', 'disabled', 'typeaheadDelay', 'expansionDelay'],
      outputs: ['itemSelected'],
    },
  ],
  host: {
    'data-slot': 'menu',
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    '[animate.leave]': 'leaveAnimation()',
    '(keydown.tab)': 'onTab()',
  },
})
export class ScMenu<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly menu = inject<Menu<V>>(Menu);

  /**
   * A context menu tears its overlay down on close, so the leave animation
   * never finishes and its classes stay on the element. The next open then
   * reuses that element and fades in and out at once. Nothing is lost by
   * skipping it: the pane is destroyed either way.
   */
  private readonly contextMenu = inject(SC_CONTEXT_MENU_PROVIDER, {
    optional: true,
  });

  protected readonly leaveAnimation = computed(() =>
    this.contextMenu ? '' : 'animate-out fade-out-0 zoom-out-95 duration-150',
  );
  readonly visible = this.menu.visible;

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground min-w-32 w-60 rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto data-[visible=false]:hidden',
      this.classInput(),
    ),
  );

  /**
   * Tab closes the whole menu chain and moves on, as in the WAI-ARIA menu
   * button pattern. `@angular/aria` has no Tab handling, and because the
   * popover sits before its trigger in the DOM, Tab would land on the trigger
   * and leave the menu open. Refocusing the top-level opener here, without
   * preventing the default, lets the browser's Tab continue from it.
   */
  protected onTab(): void {
    const opener = topLevelOpener(this.menu as Menu<unknown>);
    if (!opener) return;
    opener.close();
    opener.element.focus();
  }

  constructor() {
    const portal = inject(ScMenuPortal, { optional: true });
    portal?.menu.set(this.menu as Menu<unknown>);
  }
}

/** The trigger, or menubar item, that opened the outermost menu. */
function topLevelOpener(
  menu: Menu<unknown>,
): MenuTrigger<unknown> | MenuItem<unknown> | undefined {
  let parent = menu.parent();
  while (parent instanceof MenuItem) {
    const owner = parent.parent;
    if (owner instanceof MenuBar) return parent;
    if (!(owner instanceof Menu)) return parent;
    parent = owner.parent();
  }
  return parent instanceof MenuTrigger ? parent : undefined;
}
