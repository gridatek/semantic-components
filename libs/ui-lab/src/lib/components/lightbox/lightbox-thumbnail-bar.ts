import { Listbox } from '@angular/aria/listbox';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: '[scLightboxThumbnailBar]',
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['values'],
      outputs: ['valuesChange'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScLightboxThumbnailBar {
  private readonly provider = inject(SC_LIGHTBOX_PROVIDER);
  private readonly listbox = inject(Listbox);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-center gap-2 overflow-x-auto bg-black/50 px-4 py-3',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      const values = this.listbox.values();
      if (values.length > 0) {
        const index = Number(values[0]);
        if (!isNaN(index)) {
          this.provider.goTo(index);
        }
      }
    });
  }
}
