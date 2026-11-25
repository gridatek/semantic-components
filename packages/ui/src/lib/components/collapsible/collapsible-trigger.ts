import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScCollapsible } from './collapsible';

/**
 * The button that shows and hides a collapsible's panel: aria-expanded,
 * aria-controls. Its collapsible is the one around it — or, from anywhere,
 * the one it names: `[scCollapsibleTrigger]="filters"` (with
 * `#filters="scCollapsible"`), a button in a header for a panel further
 * down. Behaviour only — its look is yours (scButton).
 */
@Directive({
  selector: 'button[scCollapsibleTrigger]',
  host: {
    'data-slot': 'collapsible-trigger',
    type: 'button',
    '[attr.aria-expanded]': 'collapsible().open()',
    '[attr.aria-controls]': 'collapsible().panelId()',
    '[attr.data-panel-open]': 'collapsible().open() ? "" : null',
    '[disabled]': 'collapsible().disabled()',
    '[class]': 'class()',
    '(click)': 'collapsible().toggle()',
  },
})
export class ScCollapsibleTrigger {
  private readonly around = inject(ScCollapsible, { optional: true });

  /** The collapsible it controls, when it isn't the one around it. */
  readonly target = input<ScCollapsible | '' | undefined>(undefined, {
    alias: 'scCollapsibleTrigger',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  /** Named, or the one around it. */
  private readonly collapsible = computed(() => {
    const collapsible = this.target() || this.around;
    if (!collapsible)
      throw new Error(
        'scCollapsibleTrigger needs a collapsible: inside one, or naming it ([scCollapsibleTrigger]="ref").',
      );
    return collapsible;
  });

  private readonly class = computed(() => cn(this.classInput()));
}
