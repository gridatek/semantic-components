import { Directive, input } from '@angular/core';
import { ScTooltipTrigger } from '../tooltip';

/**
 * Our Tooltip with its text optional, so a menu button can host it without
 * exposing a required input (angular/angular#50510). Internal to the sidebar.
 */
@Directive({ selector: '[scSidebarNextMenuTooltip]' })
export class ScSidebarNextMenuTooltip extends ScTooltipTrigger {
  override readonly content = input<string>('', { alias: 'scTooltipTrigger' });
}
