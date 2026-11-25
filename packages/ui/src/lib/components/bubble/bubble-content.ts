import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * The bubble's text, in the style's look. On a `button` or an `a` the whole
 * bubble is clickable, with a focus ring (a button gets `type="button"`).
 */
@Directive({
  selector: 'div[scBubbleContent], button[scBubbleContent], a[scBubbleContent]',
  host: {
    'data-slot': 'bubble-content',
    '[attr.type]': "isButton ? 'button' : null",
    '[class]': 'class()',
  },
})
export class ScBubbleContent {
  private readonly styles = injectStyle().bubble;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly isButton =
    inject(ElementRef<HTMLElement>).nativeElement.tagName === 'BUTTON';

  private readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );
}
