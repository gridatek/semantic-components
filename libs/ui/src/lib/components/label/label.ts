import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

@Directive({
  selector: 'label[scLabel]',
  host: {
    'data-slot': 'label',
    '[attr.id]': 'id()',
    '[attr.for]': 'for()',
    '[class]': 'class()',
  },
})
export class ScLabel {
  private readonly field = inject(SC_FIELD, { optional: true });

  readonly idInput = input<string>('', { alias: 'id' });
  readonly forInput = input<string>('', { alias: 'for' });
  readonly classInput = input<string>('', { alias: 'class' });

  /** In a field, `<field id>-label`: what names a control that is not an input (a group). */
  protected readonly id = computed(
    () =>
      this.idInput() ||
      (this.field && !this.forInput() ? `${this.field.id()}-label` : null),
  );

  protected readonly for = computed(() => {
    // Priority: explicit for input > field context
    const forValue = this.forInput() || this.field?.id();
    return forValue || null;
  });

  protected readonly class = computed(() =>
    cn(
      'has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 peer-disabled:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 group/label peer/label flex w-fit leading-snug',
      'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
      this.classInput(),
    ),
  );
}
