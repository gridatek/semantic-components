import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScListboxGroup } from './listbox-group';

let nextId = 0;

/** A group's name: the style's combobox group label. */
@Directive({
  selector: '[scListboxGroupLabel]',
  host: {
    'data-slot': 'listbox-group-label',
    '[attr.id]': 'id',
    '[class]': 'class()',
  },
})
export class ScListboxGroupLabel {
  private readonly styles = injectStyle().combobox;
  private readonly group = inject(ScListboxGroup);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly id = `sc-listbox-group-label-${nextId++}`;

  private readonly class = computed(() =>
    cn(this.styles.groupLabel, this.classInput()),
  );

  constructor() {
    this.group.labelId.set(this.id);
    inject(DestroyRef).onDestroy(() => {
      if (this.group.labelId() === this.id) this.group.labelId.set(null);
    });
  }
}
