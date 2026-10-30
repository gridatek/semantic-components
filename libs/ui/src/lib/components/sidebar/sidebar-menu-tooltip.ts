import { Directive, input } from '@angular/core';
import { ScTooltipTrigger } from '../tooltip';

/**
 * Our Tooltip with its text optional, so a menu button can host it without
 * exposing a required input (angular/angular#50510). Exported because a
 * public part hosts it (a library must export its parts' host directives),
 * not for use on its own: use `tooltip` on `scSidebarMenuButton`.
 */
@Directive({ selector: '[scSidebarMenuTooltip]' })
export class ScSidebarMenuTooltip extends ScTooltipTrigger {
  override readonly content = input<string>('', { alias: 'scTooltipTrigger' });
}
