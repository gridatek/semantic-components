import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSelectNextGroup } from './select-next-group';

/** A group's heading: it names the group. */
@Directive({
  selector: 'div[scSelectNextGroupLabel]',
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScSelectNextGroupLabel {
  private readonly group = inject(ScSelectNextGroup, { optional: true });
  private readonly styles = injectPreset().select;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input(inject(_IdGenerator).getId('sc-select-group-'), {
    alias: 'id',
  });

  readonly id = computed(() => this.idInput());

  protected readonly class = computed(() =>
    cn(this.styles.groupLabel, this.classInput()),
  );

  constructor() {
    effect(() => this.group?.labelId.set(this.id()));
  }
}
