import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, inject, input, linkedSignal } from '@angular/core';

@Directive({
  host: {
    'data-slot': 'control',
  },
})
export class ScControl {
  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-control-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());
}
