import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
  model,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { scInputStyles } from '../input/input';
import { ScPlainInput } from '../input/plain-input';

@Component({
  selector: 'input[sc-input-phone]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
    '[type]': '"tel"',
    '[placeholder]': 'placeholder() || "Enter phone number"',
    '[autocomplete]': '"tel"',
    '[attr.inputmode]': '"tel"',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: ScPlainInput,
      inputs: ['value'],
      outputs: ['valueChange'],
    },
  ],
})
export class ScInputPhone {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly placeholder = input<string>('');

  protected readonly class = computed(() => cn(scInputStyles(), this.classInput()));

  readonly value = model<string>('');

  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-input-phone-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());

  private readonly host = inject(ElementRef);

  get nativeElement() {
    return this.host.nativeElement;
  }
}
