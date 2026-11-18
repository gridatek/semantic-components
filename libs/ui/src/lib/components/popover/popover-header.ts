import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The popover's title and description, together. */
@Directive({
  selector: 'div[scPopoverHeader]',
  host: { '[class]': 'class()' },
})
export class ScPopoverHeader {
  private readonly styles = injectStyle().popover;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
