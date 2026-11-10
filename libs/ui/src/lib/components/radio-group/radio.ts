import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScRadioGroup } from './radio-group';

@Directive({
  selector: 'input[scRadio]',
  host: {
    // Its own type: the markup needs none.
    type: 'radio',
    'data-slot': 'radio',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[value]': 'nativeValue()',
    '(change)': 'onChange()',
  },
})
export class ScRadio {
  private readonly styles = injectPreset().radioGroup;
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly radioGroup = inject(ScRadioGroup, { optional: true });
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-radio-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', {
    alias: 'class',
  });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  /** This radio's option: the group's value when it is picked. */
  readonly value = input<unknown>(undefined);
  readonly disabledInput = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  readonly disabled = computed(
    () => this.disabledInput() || (this.radioGroup?.disabled() ?? false),
  );

  // Bound automatically by the Field directive (FormUiControl contract).
  // Value, checked and disabled already come from its native-input support;
  // aria-invalid does not, so it has to be surfaced here.
  readonly invalid = input<boolean>(false);
  readonly touched = input<boolean>(false);

  // Do not surface invalid until the control has been touched: its own
  // [formField] (the Angular way), or the group's.
  protected readonly ariaInvalid = computed(
    () =>
      (this.touched() && this.invalid()) ||
      this.radioGroup?.showInvalid() ||
      null,
  );

  /** The native value: the option, as text. */
  protected readonly nativeValue = computed(() => {
    const value = this.value();
    return value === undefined || value === null ? 'on' : String(value);
  });

  constructor() {
    // In a group holding the choice: checked when its option is the group's
    // value, named as the group (one Tab stop, the arrows move the choice).
    effect(() => {
      const group = this.radioGroup;
      if (!group?.holdsChoice()) return;
      this.element.name = group.radioName();
      this.element.checked = Object.is(group.value(), this.value());
    });
  }

  protected onChange(): void {
    if (this.element.checked && this.radioGroup?.holdsChoice()) {
      this.radioGroup.select(this.value());
    }
  }

  protected readonly class = computed(() =>
    cn(
      "appearance-none before:content-['']",
      this.styles.item,
      this.styles.dot,
      this.classInput(),
    ),
  );
}
