import { Combobox } from '@angular/aria/combobox';
import {
  DestroyRef,
  Directive,
  computed,
  effect,
  inject,
  input,
  model,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { SC_COMMAND } from './command-tokens';

/**
 * The search input of a command. It is an always-expanded editable combobox:
 * typing filters (via `[(value)]`), arrows move through the list, Enter runs
 * the active item.
 */
@Directive({
  selector: 'input[scCommandInput]',
  hostDirectives: [Combobox],
  host: {
    'data-slot': 'command-input',
    autocomplete: 'off',
    '[class]': 'class()',
  },
})
export class ScCommandInput {
  readonly combobox = inject(Combobox);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The search text, for filtering. */
  readonly value = model('');

  protected readonly class = computed(() =>
    cn(
      'w-full bg-transparent text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(this.combobox.alwaysExpanded, true);

    effect(() => {
      const value = this.value();
      untracked(() => {
        if (this.combobox.value() !== value) this.combobox.value.set(value);
      });
    });
    effect(() => {
      const value = this.combobox.value();
      untracked(() => {
        if (this.value() !== value) this.value.set(value);
      });
    });

    const command = inject(SC_COMMAND);
    command.input.set(this.combobox);
    inject(DestroyRef).onDestroy(() => command.input.set(undefined));
  }
}
