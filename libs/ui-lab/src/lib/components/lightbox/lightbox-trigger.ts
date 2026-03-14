import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: '[scLightboxTrigger]',
  host: {
    'data-slot': 'lightbox-trigger',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScLightboxTrigger {
  private readonly provider = inject(SC_LIGHTBOX_PROVIDER);
  readonly index = input<number>(0);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'cursor-pointer overflow-hidden rounded-lg focus:ring-ring focus:ring-2 focus:outline-none',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.provider.open(this.index());
  }
}
