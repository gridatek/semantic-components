import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { SC_FIELD, type ScFieldContext } from '../field/field';

/**
 * A checkbox beside its text: a label round both, or a div with a label and a
 * description. The checkbox draws itself: the field only lays them out.
 */
@Directive({
  selector: 'div[scCheckboxField], label[scCheckboxField]',
  providers: [{ provide: SC_FIELD, useExisting: ScCheckboxField }],
  host: {
    '[attr.role]': 'role()',
    '[class]': 'class()',
  },
})
export class ScCheckboxField implements ScFieldContext {
  private readonly labelStyles = injectPreset().label;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly id = input(inject(_IdGenerator).getId('sc-checkbox-field-'));
  readonly descriptionIds = signal<string[]>([]);
  /** The `[formField]` inside, for `scFieldErrors`. */
  readonly formField = contentChild(FormField);
  readonly classInput = input<string>('', { alias: 'class' });

  // A div groups its label and description; a label is one already.
  protected readonly role = computed(() =>
    this.element.tagName === 'LABEL' ? null : 'group',
  );

  protected readonly class = computed(() =>
    cn(
      this.labelStyles.label,
      'font-normal tracking-normal normal-case',
      'grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1',
      '*:data-[slot=checkbox]:col-start-1 *:data-[slot=checkbox]:row-start-1',
      '*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1',
      '*:data-[slot=field-description]:col-start-2 *:data-[slot=field-description]:row-start-2',
      'has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium',
      this.classInput(),
    ),
  );
}
