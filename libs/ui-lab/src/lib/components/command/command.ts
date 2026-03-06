import { Combobox } from '@angular/aria/combobox';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '@semantic-components/ui';

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
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => signalSetFn(this.combobox.filterMode[SIGNAL], 'manual'));
    effect(() => signalSetFn(this.combobox.alwaysExpanded[SIGNAL], true));
  }
}
