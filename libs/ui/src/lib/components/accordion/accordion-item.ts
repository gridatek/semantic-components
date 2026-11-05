import type { AccordionPanel, AccordionTrigger } from '@angular/aria/accordion';
import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, setInput } from '../../utils';
import { ScAccordion } from './accordion';
import {
  SC_ACCORDION_ITEM,
  type ScAccordionItemContext,
} from './accordion-item-context';

/**
 * An item: its heading and trigger, and its panel — connected here, nothing
 * to wire. Open when its value is in the accordion's.
 */
@Directive({
  selector: '[scAccordionItem]',
  exportAs: 'scAccordionItem',
  providers: [{ provide: SC_ACCORDION_ITEM, useExisting: ScAccordionItem }],
  host: {
    '[class]': 'class()',
    '[attr.data-open]': 'open() || null',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScAccordionItem implements ScAccordionItemContext {
  private readonly styles = injectPreset().accordion;
  private readonly accordion = inject(ScAccordion);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its name in the accordion's value; made up if left out. */
  readonly value = input<string>(
    inject(_IdGenerator).getId('sc-accordion-item-'),
  );
  /** Not opened nor closed; still reached by the keyboard. */
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  private readonly trigger = signal<AccordionTrigger | undefined>(undefined);
  private readonly panel = signal<AccordionPanel | undefined>(undefined);

  /** Open: its value is in the accordion's. */
  readonly open = computed(() => this.accordion.value().includes(this.value()));

  protected readonly class = computed(() =>
    cn(this.styles.item, this.classInput()),
  );

  constructor() {
    effect(() => {
      const trigger = this.trigger();
      if (trigger) setInput(trigger.disabled, this.disabled());
    });
    // The accordion's value opens it…
    effect(() => {
      const open = this.open();
      const trigger = untracked(this.trigger);
      if (trigger && open !== untracked(trigger.expanded))
        trigger.expanded.set(open);
    });
    // …and its trigger writes it back.
    effect(() => {
      const trigger = this.trigger();
      if (!trigger) return;
      const expanded = trigger.expanded();
      const value = untracked(this.value);
      untracked(() =>
        this.accordion.value.update((open) =>
          expanded
            ? open.includes(value)
              ? open
              : [...open, value]
            : open.filter((v) => v !== value),
        ),
      );
    });
  }

  registerTrigger(trigger: AccordionTrigger): void {
    this.trigger.set(trigger);
    this.connect();
  }

  registerPanel(panel: AccordionPanel): void {
    this.panel.set(panel);
    this.connect();
  }

  /**
   * Its trigger controls its panel — set as soon as both exist, before Aria's
   * trigger initialises (it reads its panel then).
   */
  private connect(): void {
    const [trigger, panel] = [untracked(this.trigger), untracked(this.panel)];
    if (trigger && panel) setInput(trigger.panel, panel);
  }
}
