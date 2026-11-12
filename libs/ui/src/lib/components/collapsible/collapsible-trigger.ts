import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScCollapsible } from './collapsible';

/**
 * The button that shows and hides its collapsible's panel: aria-expanded,
 * aria-controls. Behaviour only — its look is yours (scButton).
 */
@Directive({
  selector: 'button[scCollapsibleTrigger]',
  host: {
    'data-slot': 'collapsible-trigger',
    type: 'button',
    '[attr.aria-expanded]': 'collapsible.open()',
    '[attr.aria-controls]': 'collapsible.panelId()',
    '[attr.data-panel-open]': 'collapsible.open() ? "" : null',
    '[disabled]': 'collapsible.disabled()',
    '[class]': 'class()',
    '(click)': 'collapsible.toggle()',
  },
})
export class ScCollapsibleTrigger {
  protected readonly collapsible = inject(ScCollapsible);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
