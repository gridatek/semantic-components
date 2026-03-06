import { Combobox } from '@angular/aria/combobox';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCommand]',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled'],
    },
  ],
  host: {
    'data-slot': 'command',
    '[class]': 'class()',
  },
})
export class ScCommand {
  private readonly combobox = inject(Combobox);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex size-full flex-col overflow-hidden rounded-xl bg-popover p-1 text-popover-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => signalSetFn(this.combobox.filterMode[SIGNAL], 'manual'));
    effect(() => signalSetFn(this.combobox.alwaysExpanded[SIGNAL], true));
  }
}
