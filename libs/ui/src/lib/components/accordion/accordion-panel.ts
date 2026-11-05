import { AccordionPanel } from '@angular/aria/accordion';
import { DeferredContentAware } from '@angular/aria/private';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_ACCORDION_ITEM } from './accordion-item-context';

/**
 * An item's panel (role region, named by its trigger). Its content, in an `ng-template scAccordionContent`, is created when it
 * first opens and kept: closed, the panel is inert and its height animates to
 * nothing.
 *
 * Angular Aria's panel itself (extended, not a host directive), so the item
 * can give it to its trigger.
 */
@Component({
  selector: '[scAccordionPanel]',
  exportAs: 'scAccordionPanel',
  template: `<div [class]="contentClass()"><ng-content /></div>`,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAccordionPanel extends AccordionPanel {
  private readonly styles = injectPreset().accordion;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.styles.panel,
      // Open and close: the height, to and from auto (interpolate-size).
      'transition-[height,display] transition-discrete duration-200 ease-out starting:h-0 [[inert]]:hidden [[inert]]:h-0',
      this.classInput(),
    ),
  );
  protected readonly contentClass = computed(() => this.styles.content);

  constructor() {
    super();
    // Kept once created: the close animates the content, not an empty box.
    // (Aria's, from the panel's host directive; published as private.)
    inject(DeferredContentAware).preserveContent.set(true);
    inject(SC_ACCORDION_ITEM).registerPanel(this);
  }
}
