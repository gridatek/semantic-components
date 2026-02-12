import { Combobox } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-combobox]',
  imports: [Combobox],
  hostDirectives: [
    {
      directive: Combobox,
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCombobox {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('relative', this.classInput()));

  private readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));
  }
}
