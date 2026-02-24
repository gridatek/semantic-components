import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scScrollArea]',
  host: {
    'data-slot': 'scroll-area',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
  styles: `
    [data-slot='scroll-area'] {
      scrollbar-width: thin;
      scrollbar-color: var(--color-border) transparent;
    }
    [data-slot='scroll-area']::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    [data-slot='scroll-area']::-webkit-scrollbar-track {
      background: transparent;
    }
    [data-slot='scroll-area']::-webkit-scrollbar-thumb {
      background-color: var(--color-border);
      border-radius: 9999px;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScScrollArea {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('overflow-auto', this.classInput()),
  );
}
