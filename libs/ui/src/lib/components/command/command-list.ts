import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScCommand } from './command';

/**
 * The items (`role="listbox"`), scrolling past its height, its scrollbar
 * shown (`hideScrollbar` hides it). Name it (`aria-label`).
 */
@Directive({
  selector: 'div[scCommandList]',
  host: {
    'data-slot': 'command-list',
    role: 'listbox',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScCommandList {
  private readonly styles = injectPreset().command;
  protected readonly id = inject(_IdGenerator).getId('sc-command-list-');

  readonly classInput = input<string>('', { alias: 'class' });
  /** Hides its scrollbar (shadcn's look): nothing then shows that it scrolls. */
  readonly hideScrollbar = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      this.styles.list,
      this.hideScrollbar() ? 'no-scrollbar' : '[scrollbar-width:thin]',
      this.classInput(),
    ),
  );

  constructor() {
    const command = inject(ScCommand);
    command.listId.set(this.id);
    inject(DestroyRef).onDestroy(() => command.listId.set(null));
  }
}
