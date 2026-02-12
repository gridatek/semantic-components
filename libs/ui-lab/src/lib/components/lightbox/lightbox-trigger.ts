import { Directive, inject, input } from '@angular/core';
import { SC_LIGHTBOX } from './lightbox';

@Directive({
  selector: '[sc-lightbox-trigger]',
  host: {
    'data-slot': 'lightbox-trigger',
    '[style.cursor]': '"pointer"',
    '(click)': 'onClick()',
  },
})
export class ScLightboxTrigger {
  private readonly lightbox = inject(SC_LIGHTBOX);
  readonly index = input<number>(0);

  onClick(): void {
    this.lightbox.open(this.index());
  }
}
