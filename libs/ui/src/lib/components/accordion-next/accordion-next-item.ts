import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, setInput } from '../../utils';
import { ScAccordionNext } from './accordion-next';
import { ScAccordionNextTrigger } from './accordion-next-trigger';

/**
 * An item: its heading and trigger, and its panel. Open when its value is in
 * the accordion's.
 */
@Directive({
  selector: '[scAccordionNextItem]',
  exportAs: 'scAccordionNextItem',
  host: {
    '[class]': 'class()',
    '[attr.data-open]': 'open() || null',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScAccordionNextItem {
  private readonly styles = injectPreset().accordion;
  private readonly accordion = inject(ScAccordionNext);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its name in the accordion's value; made up if left out. */
  readonly value = input<string>(
    inject(_IdGenerator).getId('sc-accordion-item-'),
  );
  /** Not opened nor closed; still reached by the keyboard. */
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  private readonly triggerPart = contentChild.required(ScAccordionNextTrigger);

  /** Open: its value is in the accordion's. */
  readonly open = computed(() => this.accordion.value().includes(this.value()));

  protected readonly class = computed(() =>
    cn(this.styles.item, this.classInput()),
  );

  constructor() {
    effect(() => {
      setInput(this.triggerPart().trigger.disabled, this.disabled());
    });
    // The accordion's value opens it…
    effect(() => {
      const open = this.open();
      const trigger = untracked(this.triggerPart).trigger;
      if (open !== untracked(trigger.expanded)) trigger.expanded.set(open);
    });
    // …and its trigger writes it back.
    effect(() => {
      const expanded = this.triggerPart().trigger.expanded();
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
}
