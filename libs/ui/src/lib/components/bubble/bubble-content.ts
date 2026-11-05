import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * The bubble's text, in the preset's look. On a `button` or an `a` the whole
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
  private readonly styles = injectPreset().bubble;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isButton =
    inject(ElementRef<HTMLElement>).nativeElement.tagName === 'BUTTON';

  protected readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );
}
