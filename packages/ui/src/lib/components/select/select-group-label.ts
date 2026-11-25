import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScSelectGroup } from './select-group';

/** A group's heading: it names the group. */
@Directive({
  selector: 'div[scSelectGroupLabel]',
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScSelectGroupLabel {
  private readonly group = inject(ScSelectGroup, { optional: true });
  private readonly styles = injectStyle().select;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input(inject(_IdGenerator).getId('sc-select-group-'), {
    alias: 'id',
  });

  private readonly id = computed(() => this.idInput());

  private readonly class = computed(() =>
    cn(this.styles.groupLabel, this.classInput()),
  );

  constructor() {
    effect(() => this.group?.labelId.set(this.id()));
  }
}
