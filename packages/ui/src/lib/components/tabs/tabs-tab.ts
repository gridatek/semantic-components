import { Tab } from '@angular/aria/tabs';
import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * A tab (role tab), on your button: its text and icons are yours. A disabled
 * tab is reached by the arrows but not selected.
 */
@Directive({
  selector: 'button[scTabsTab]',
  exportAs: 'scTabsTab',
  hostDirectives: [{ directive: Tab, inputs: ['value', 'disabled', 'id'] }],
  host: {
    type: 'button',
    // A disabled tab is still reached by the arrows (aria-disabled, Aria's
    // way): a native disabled button could not take focus.
    '[attr.disabled]': 'null',
    '[class]': 'class()',
    // Wholly in sight once focused, in a list that scrolls (a phone): the
    // browser leaves a partly visible one where it is.
    '(focus)': 'scrollIntoSight()',
  },
})
export class ScTabsTab {
  private readonly styles = injectStyle().tabs;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  private scrollIntoSight(): void {
    this.element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  private readonly class = computed(() =>
    cn(this.styles.trigger, this.classInput()),
  );
}
