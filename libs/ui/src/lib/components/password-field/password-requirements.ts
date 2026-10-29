import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScPasswordField } from './password-field';

/**
 * Your rules for the password, a `scPasswordRequirement` each: read with
 * the input (`aria-describedby`), so a screen reader hears them — met or not
 * — as it reaches the input.
 */
@Directive({
  selector: 'ul[scPasswordRequirements]',
  host: {
    'data-slot': 'password-requirements',
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScPasswordRequirements {
  private readonly password = inject(ScPasswordField);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-password-requirements-'));

  protected readonly class = computed(() =>
    cn('grid gap-1 text-sm', this.classInput()),
  );

  constructor() {
    effect((onCleanup) => {
      const id = this.id();
      const ids = this.password.field.descriptionIds;
      ids.update((all) => [...all, id]);
      onCleanup(() => ids.update((all) => all.filter((i) => i !== id)));
    });
  }
}
