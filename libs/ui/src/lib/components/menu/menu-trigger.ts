import { MenuTrigger } from '@angular/aria/menu';
import { ToolbarWidget } from '@angular/aria/toolbar';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_MENU } from './menu-context';

/**
 * Opens the menu; behaviour only, on any button (scButton for the look). A
 * pointer open highlights no item; a keyboard open, the first.
 */
@Directive({
  selector: '[scMenuTrigger]',
  exportAs: 'scMenuTrigger',
  hostDirectives: [MenuTrigger, CdkOverlayOrigin],
  host: {
    '[class]': 'class()',
    '[attr.tabindex]': 'tabIndex()',
    '(pointerdown)': 'context?.quiet.set(true)',
    '(keydown)': 'context?.quiet.set(false)',
  },
})
export class ScMenuTrigger {
  private readonly context = inject(SC_MENU, { optional: true });
  readonly trigger = inject(MenuTrigger);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly expanded = this.trigger.expanded;
  /** In a toolbar (`scToolbarWidget` beside it): the toolbar's widget. */
  private readonly widget = inject(ToolbarWidget, {
    self: true,
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  /**
   * In a toolbar, its Tab stop is the toolbar's (one for all its widgets),
   * not the trigger's: both Aria directives bind `tabindex`, and which one
   * wins would depend on the order the component imports them.
   */
  private readonly tabIndex = computed(() =>
    this.widget ? this.widget._pattern.tabIndex() : this.trigger.tabIndex(),
  );
}
