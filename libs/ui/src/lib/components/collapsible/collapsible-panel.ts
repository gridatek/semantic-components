import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { cn } from 'cn';
import { ScCollapsible } from './collapsible';

/**
 * The content its trigger shows and hides, written inside it. Closed, it is
 * hidden and its height animates to nothing; with `hiddenUntilFound`, the
 * browser's find-in-page still searches it, and a match opens it.
 */
@Directive({
  selector: 'div[scCollapsiblePanel]',
  host: {
    'data-slot': 'collapsible-content',
    '[id]': 'id()',
    '[attr.hidden]': 'hidden()',
    '[attr.data-open]': 'collapsible.open() ? "" : null',
    '[attr.data-closed]': 'collapsible.open() ? null : ""',
    '[class]': 'class()',
    '(beforematch)': 'collapsible.open.set(true)',
    '(transitionend)': 'onTransitionEnd($event)',
  },
})
export class ScCollapsiblePanel {
  protected readonly collapsible = inject(ScCollapsible);
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-collapsible-panel-',
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  /** Closed, still searched by find-in-page; a match opens it. */
  readonly hiddenUntilFound = input(false, { transform: booleanAttribute });

  protected readonly id = computed(() => this.idInput() || this.fallbackId);

  /**
   * Just closed, searchable: its height still on the way to nothing. Its
   * hidden="until-found" waits for that — it would make its height 0 at once
   * (the browser gives it size containment), where hidden="" lets the
   * transition keep its display until the end.
   */
  private readonly closing = linkedSignal<boolean, boolean>({
    source: () => this.collapsible.open(),
    computation: (open, previous) =>
      !open && previous?.source === true && this.hiddenUntilFound(),
  });
  /**
   * Closed: the hidden attribute (Tailwind's base keeps it display: none over
   * any display class); searchable, the browser's hidden="until-found".
   */
  protected readonly hidden = computed(() => {
    if (this.collapsible.open() || this.closing()) return null;
    return this.hiddenUntilFound() ? 'until-found' : '';
  });

  protected readonly class = computed(() =>
    cn(
      // Open and close: the height, to and from auto (the global
      // interpolate-size), and the display the hidden attribute sets.
      'overflow-hidden transition-[height,display] transition-discrete duration-200 ease-out starting:h-0 motion-reduce:transition-none',
      this.collapsible.open() ? 'h-auto' : 'h-0',
      this.classInput(),
    ),
  );

  constructor() {
    // Its id for the trigger's aria-controls.
    effect(() => this.collapsible.panelId.set(this.id()));
    // No transition to end it (reduced motion, none of yours): hidden anyway.
    effect((onCleanup) => {
      if (!this.closing()) return;
      const timer = setTimeout(() => this.closing.set(false), 400);
      onCleanup(() => clearTimeout(timer));
    });
  }

  protected onTransitionEnd(event: TransitionEvent): void {
    if (event.target === event.currentTarget && event.propertyName === 'height')
      this.closing.set(false);
  }
}
