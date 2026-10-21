import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Your content, written once — `<ng-template scMarqueeContent>`: the
 * marquee repeats it as often as it takes to fill, the copies hidden from
 * screen readers and the keyboard.
 */
@Directive({
  selector: 'ng-template[scMarqueeContent]',
})
export class ScMarqueeContent {
  readonly template = inject(TemplateRef);
}
