import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Component({
  selector: 'span[scLightboxCounter]',
  template: `
    {{ provider.currentIndex() + 1 }} / {{ provider.images().length }}
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLightboxCounter {
  readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm text-white/80', this.classInput()),
  );
}
