import { Combobox } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
import { ScSelectList } from './select-list';
import { ScSelectTrigger } from './select-trigger';

@Component({
  selector: 'div[sc-select]',
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
    'data-slot': 'select',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelect {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly trigger = contentChild(ScSelectTrigger);
  private readonly content = contentChild(ScSelectList, {
    descendants: true,
  });

  readonly origin = computed(() => this.trigger()?.overlayOrigin);
  readonly values = computed(() => this.content()?.listbox.values() ?? []);
  readonly displayValue = computed(() => {
    const vals = this.values();
    return vals.length > 0 ? String(vals[0]) : '';
  });

  protected readonly class = computed(() => cn('relative', this.classInput()));

  private readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));
  }
}
