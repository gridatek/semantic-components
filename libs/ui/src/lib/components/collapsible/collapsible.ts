import {
  Directive,
  booleanAttribute,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from 'cn';

/**
 * A disclosure: a trigger that shows and hides a panel (Base UI's
 * Collapsible). Open: `[(open)]`; `disabled` stops its trigger.
 */
@Directive({
  selector: '[scCollapsible]',
  exportAs: 'scCollapsible',
  host: {
    'data-slot': 'collapsible',
    '[attr.data-open]': 'open() ? "" : null',
    '[attr.data-closed]': 'open() ? null : ""',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScCollapsible {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Its panel shown: two-way. */
  readonly open = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Its panel's id, for the trigger's aria-controls. */
  readonly panelId = signal<string | null>(null);

  protected readonly class = computed(() => cn(this.classInput()));

  /** Opens or closes it — unless disabled. */
  toggle(): void {
    if (!this.disabled()) this.open.update((open) => !open);
  }
}
