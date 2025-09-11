import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { cva } from 'class-variance-authority';

import { ScLabel } from '../label';

const fieldVariants = cva('', {
  variants: {
    type: {
      regular: '*:data-[slot=control]:mt-1 [&>[data-slot=control]+[data-slot=description]]:mt-2',
      floating: [
        'relative',
        '[&_label]:absolute [&_label]:left-3 [&_label]:z-10 [&_label]:transition-all [&_label]:duration-200 [&_label]:ease-in-out [&_label]:pointer-events-none',
        '[&_label]:top-1/2 [&_label]:-translate-y-1/2 [&_label]:text-sm [&_label]:text-muted-foreground [&_label]:origin-left',
        '[&:has([data-slot=control]:focus)_label]:text-xs [&:has([data-slot=control]:focus)_label]:text-primary [&:has([data-slot=control]:focus)_label]:bg-background [&:has([data-slot=control]:focus)_label]:px-1 [&:has([data-slot=control]:focus)_label]:-ml-1',
        '[&:has([data-slot=control]:focus)_label]:top-(--floating-label-top-offset)',
        '[&:has([data-slot=control]:not(:placeholder-shown))_label]:text-xs [&:has([data-slot=control]:not(:placeholder-shown))_label]:text-muted-foreground [&:has([data-slot=control]:not(:placeholder-shown))_label]:bg-background [&:has([data-slot=control]:not(:placeholder-shown))_label]:px-1 [&:has([data-slot=control]:not(:placeholder-shown))_label]:-ml-1',
        '[&:has([data-slot=control]:not(:placeholder-shown))_label]:top-(--floating-label-top-offset)',
      ],
    },
    orientation: {
      vertical: 'flex flex-col',
      horizontal: 'grid grid-cols-4 items-center gap-4 [&_[data-slot=control]]:col-span-3',
      'horizontal-right':
        'grid grid-cols-4 items-center gap-4 [&_label]:text-right [&_[data-slot=control]]:col-span-3',
      'horizontal-checkbox': 'flex items-center gap-2 min-h-[44px] group relative',
      'checkbox-with-text': 'flex items-start gap-2',
    },
  },
  defaultVariants: {
    type: 'regular',
    orientation: 'vertical',
  },
});

@Component({
  selector: 'div[sc-field]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'field',
    '[class]': 'class()',
    '[style.--floating-label-top-offset]': '"0"',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScField {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly floatingLabel = input<boolean>(false);

  readonly controlId = input<string>();

  readonly orientation = input<
    'vertical' | 'horizontal' | 'horizontal-right' | 'horizontal-checkbox' | 'checkbox-with-text'
  >('vertical');

  protected readonly class = computed(() =>
    cn(
      fieldVariants({
        type: this.floatingLabel() ? 'floating' : 'regular',
        orientation: this.orientation(),
      }),
      this.classInput(),
    ),
  );

  private readonly elementRef = inject(ElementRef);

  readonly scLabel = contentChild(ScLabel);

  constructor() {
    afterNextRender(() => {
      const fieldId = this.controlId();

      // Find control element using querySelector
      const hostElement = this.elementRef.nativeElement;
      const controlElement = hostElement.querySelector('[data-slot="control"]');

      if (fieldId) {
        this.scLabel()?.for.set(fieldId);

        if (controlElement) {
          // Set ID directly on the DOM element
          controlElement.id = fieldId;
        }
      }
    });
  }
}
