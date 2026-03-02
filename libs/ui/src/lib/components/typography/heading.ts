import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils';

export const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl font-extrabold',
      h2: 'text-3xl font-semibold first:mt-0',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
    },
    underline: {
      true: 'border-b pb-2',
      false: '',
    },
  },
  defaultVariants: {
    underline: false,
  },
});

export type ScHeadingVariants = VariantProps<typeof headingVariants>;

@Directive({
  selector: 'h1[scHeading], h2[scHeading], h3[scHeading], h4[scHeading]',
  host: {
    'data-slot': 'heading',
    '[class]': 'class()',
  },
})
export class ScHeading {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly underline = input<ScHeadingVariants['underline']>(false);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly class = computed(() => {
    const level =
      this.elementRef.nativeElement.tagName.toLowerCase() as ScHeadingVariants['level'];
    return cn(
      headingVariants({ level, underline: this.underline() }),
      this.classInput(),
    );
  });
}
