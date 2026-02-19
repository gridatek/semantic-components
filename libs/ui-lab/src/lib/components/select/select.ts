import { Combobox } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '@semantic-components/ui';
import { ScSelectList } from './select-list';
import { ScSelectTrigger } from './select-trigger';

@Component({
  selector: 'div[scSelect]',
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
export class ScSelect implements FormValueControl<string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('');
  readonly value = model<string>('');

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

    // Sync listbox selection → model
    effect(() => {
      const vals = this.values();
      const selected = vals.length > 0 ? String(vals[0]) : '';
      this.value.set(selected);
    });
  }
}
