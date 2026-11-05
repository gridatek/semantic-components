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

/**
 * An item's panel (role region, named by its trigger), given to its trigger:
 * `<div scAccordionNextPanel #shipping>` and `[panel]="shipping"`. Its
 * content, in an `ng-template scAccordionNextContent`, is created when it
 * first opens and kept: closed, the panel is inert and its height animates to
 * nothing.
 *
 * Angular Aria's panel itself (extended, not a host directive): its trigger
 * takes the panel as a required input, which only a panel of its own type
 * satisfies.
 */
@Component({
  selector: '[scAccordionNextPanel]',
  exportAs: 'scAccordionNextPanel',
  template: `<div [class]="contentClass()"><ng-content /></div>`,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAccordionNextPanel extends AccordionPanel {
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
  }
}
