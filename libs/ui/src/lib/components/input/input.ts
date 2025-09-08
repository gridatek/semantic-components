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
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScPlainInput } from './plain-input';

export const scInputStyles = signal(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
);

@Component({
  selector: 'input[sc-input]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
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
export class ScInput {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn(scInputStyles(), this.classInput()));

  readonly value = model<string>('');

  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-input-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());

  private readonly host = inject(ElementRef);

  get nativeElement() {
    return this.host.nativeElement;
  }
}
