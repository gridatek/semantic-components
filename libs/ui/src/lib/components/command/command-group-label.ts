import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScCommandGroup } from './command-group';

/** A group's heading: it names the group. */
@Directive({
  selector: '[scCommandGroupLabel]',
  host: {
    'data-slot': 'command-group-label',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScCommandGroupLabel {
  private readonly styles = injectStyle().command;
  private readonly id = inject(_IdGenerator).getId('sc-command-group-');

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.groupLabel, this.classInput()),
  );

  constructor() {
    const group = inject(ScCommandGroup);
    group.labelId.set(this.id);
    inject(DestroyRef).onDestroy(() => group.labelId.set(null));
  }
}
