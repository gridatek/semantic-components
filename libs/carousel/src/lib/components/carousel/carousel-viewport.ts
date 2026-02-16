import {
  computed,
  Component,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scCarouselViewport]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'carousel-viewport',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCarouselViewport {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly viewportElement = computed(() => this.elementRef.nativeElement);

  protected readonly class = computed(() =>
    cn('overflow-hidden', this.classInput()),
  );
}
