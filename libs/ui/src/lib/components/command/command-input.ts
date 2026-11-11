import {
  Directive,
  computed,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScCommand } from './command';

/**
 * The search (`role="combobox"`): `[(value)]` is its text. Focus stays in it
 * while the arrows move the list's highlight (`aria-activedescendant`). Name
 * it (`aria-label`).
 */
@Directive({
  selector: 'input[scCommandInput]',
  host: {
    'data-slot': 'command-input',
    role: 'combobox',
    type: 'text',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    'aria-autocomplete': 'list',
    'aria-expanded': 'true',
    '[attr.aria-controls]': 'command.listId()',
    '[attr.aria-activedescendant]': 'command.active()?.id ?? null',
    '[value]': 'value()',
    '[class]': 'class()',
    '(input)': 'onInput($any($event.target).value)',
    '(keydown)': 'command.handleKeydown($event)',
  },
})
export class ScCommandInput {
  private readonly styles = injectPreset().command;
  protected readonly command = inject(ScCommand);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The search text. */
  readonly value = model('');

  protected readonly class = computed(() =>
    cn(this.styles.input, this.classInput()),
  );

  constructor() {
    // Your [(value)] set from outside (a cleared search).
    effect(() => this.command.setSearch(this.value()));
  }

  /** Typed: the list filtered at once, not on the next render. */
  protected onInput(text: string): void {
    this.value.set(text);
    this.command.setSearch(text);
  }
}
