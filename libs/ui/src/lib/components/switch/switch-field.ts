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
 * A switch beside its text: a label round both, or a div with a label and a
 * description. The switch first, it is at the start; last, at the end. The
 * switch draws itself: the field only lays them out.
 */
@Directive({
  selector: 'div[scSwitchField], label[scSwitchField]',
  providers: [{ provide: SC_FIELD, useExisting: ScSwitchField }],
  host: {
    '[attr.role]': 'role()',
    '[class]': 'class()',
  },
})
export class ScSwitchField implements ScFieldContext {
  private readonly labelStyles = injectPreset().label;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly id = input(inject(_IdGenerator).getId('sc-switch-field-'));
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
      'grid items-center gap-x-2 gap-y-1',
      'has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium has-[>[data-slot=field-description]]:*:data-[slot=label-text]:font-medium',
      // The switch first: at the start, the text beside it.
      'has-[>:first-child[data-slot=switch]]:grid-cols-[auto_1fr]',
      'has-[>:first-child[data-slot=switch]]:*:data-[slot=switch]:col-start-1 has-[>:first-child[data-slot=switch]]:*:data-[slot=switch]:row-start-1',
      'has-[>:first-child[data-slot=switch]]:*:not-data-[slot=switch]:col-start-2',
      // The switch last: the text first, the switch at the end.
      'has-[>:not(:first-child)[data-slot=switch]]:w-full has-[>:not(:first-child)[data-slot=switch]]:grid-cols-[1fr_auto]',
      'has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=switch]:col-start-2 has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=switch]:row-start-1',
      'has-[>:not(:first-child)[data-slot=switch]]:*:not-data-[slot=switch]:col-start-1',
      // A description under the label.
      '*:data-[slot=field-description]:row-start-2',
      this.classInput(),
    ),
  );
}
