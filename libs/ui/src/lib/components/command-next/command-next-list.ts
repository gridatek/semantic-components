import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScCommandNext } from './command-next';

/** The items (`role="listbox"`), scrolling past its height. Name it (`aria-label`). */
@Directive({
  selector: 'div[scCommandNextList]',
  host: {
    'data-slot': 'command-list',
    role: 'listbox',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScCommandNextList {
  private readonly styles = injectPreset().command;
  protected readonly id = inject(_IdGenerator).getId('sc-command-list-');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.list, this.classInput()),
  );

  constructor() {
    const command = inject(ScCommandNext);
    command.listId.set(this.id);
    inject(DestroyRef).onDestroy(() => command.listId.set(null));
  }
}
