import { Directive, inject, input } from '@angular/core';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: '[scLightboxTrigger]',
  host: {
    'data-slot': 'lightbox-trigger',
    '[style.cursor]': '"pointer"',
    '(click)': 'onClick()',
  },
})
export class ScLightboxTrigger {
  private readonly provider = inject(SC_LIGHTBOX_PROVIDER);
  readonly index = input<number>(0);

  onClick(): void {
    this.provider.open(this.index());
  }
}
