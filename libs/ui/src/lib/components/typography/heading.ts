import { computed, Directive, ElementRef, inject, input } from '@angular/core';

import { cn } from '../../utils';

@Directive({
  selector: 'h1[scHeading], h2[scHeading], h3[scHeading], h4[scHeading]',
  host: {
    'data-slot': 'heading',
    '[class]': 'class()',
  },
})
export class ScHeading {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly class = computed(() => {
    const tag = this.elementRef.nativeElement.tagName.toLowerCase();
    const styles: Record<string, string> = {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    };
    return cn(styles[tag] ?? '', this.classInput());
  });
}
