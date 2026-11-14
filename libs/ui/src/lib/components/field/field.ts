import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  InjectionToken,
  Signal,
  WritableSignal,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ScFieldContentWrapper } from './field-content-wrapper';

const fieldVariants = cva('', {
  variants: {
    orientation: {
      vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
      horizontal:
        'flex-row items-center *:data-[slot=label]:flex-auto has-[>[data-slot=field-content-wrapper]]:items-start has-[>[data-slot=field-content-wrapper]]:[&>:is([role=checkbox],[role=radio])]:mt-px',
      responsive:
        'flex-col *:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:*:data-[slot=label]:flex-auto @md/field-group:has-[>[data-slot=field-content-wrapper]]:items-start @md/field-group:has-[>[data-slot=field-content-wrapper]]:[&>:is([role=checkbox],[role=radio])]:mt-px',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export type ScFieldVariants = VariantProps<typeof fieldVariants>;

export interface ScFieldContext {
  id: () => string;
  descriptionIds: WritableSignal<string[]>;
  formField: Signal<FormField<unknown> | undefined>;
}

export const SC_FIELD = new InjectionToken<ScFieldContext>('SC_FIELD');

/**
 * A checkbox, a radio or a switch: a horizontal field around one lays itself
 * out as a grid (the control at the start or the end, the text beside it).
 */
export const SC_FIELD_CHOICE = new InjectionToken<unknown>('SC_FIELD_CHOICE');

@Directive({
  selector: 'div[scField], label[scField]',
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'field',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-invalid]': 'invalid() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-pending]': 'pending() || null',
    '[class]': 'class()',
  },
  providers: [
    {
      provide: SC_FIELD,
      useExisting: ScField,
    },
  ],
})
export class ScField implements ScFieldContext {
  private readonly styles = injectPreset().field;
  private readonly labelStyles = injectPreset().label;
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * The id of the field's control, which its label points to. Not set on the
   * field element itself: two elements with one id would leave the control
   * unlabelled.
   */
  readonly id = input(inject(_IdGenerator).getId('sc-field-'));
  readonly descriptionIds = signal<string[]>([]);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScFieldVariants['orientation']>('vertical');
  readonly invalidInput = input<boolean>(false, { alias: 'invalid' });
  readonly disabledInput = input<boolean>(false, { alias: 'disabled' });

  /** `[formField]` on the field itself (a control composing it), or inside. */
  private readonly ownFormField = inject(FormField, {
    self: true,
    optional: true,
  });
  private readonly childFormField = contentChild(FormField);
  readonly formField = computed(
    () => this.ownFormField ?? this.childFormField(),
  );

  protected readonly role = computed(() => {
    const element: HTMLElement = this.elementRef.nativeElement;
    // A label keeps its own semantics. Inside a label (a choice card) it is
    // the label's control and texts, not a group: a group would hide the
    // texts from the control's name (axe's label rule).
    if (element.tagName === 'LABEL' || element.parentElement?.closest('label'))
      return null;
    return 'group';
  });

  readonly invalid = computed(() => {
    if (this.invalidInput()) return true;
    return (
      (this.formField()?.state().touched() &&
        this.formField()?.state().invalid()) ??
      false
    );
  });

  readonly disabled = computed(() => {
    if (this.disabledInput()) return true;
    return this.formField()?.state().disabled() ?? false;
  });

  /** An async validator (a server call) is running for the field. */
  readonly pending = computed(
    () => this.formField()?.state().pending() ?? false,
  );

  /** Its checkbox, radio or switch, and its content wrapper: direct children. */
  private readonly choice = contentChild(SC_FIELD_CHOICE, {
    descendants: false,
    read: ElementRef,
  });
  private readonly contentWrapper = contentChild(ScFieldContentWrapper, {
    descendants: false,
  });

  /**
   * Horizontal, around a checkbox, a radio or a switch: a grid. The control
   * first, it is at the start and the field as wide as its content (in a
   * column it still stretches; with a content wrapper — a choice card — it
   * fills); last, the text first and the control at the end. A description
   * goes under the label, in the text's column: no wrapper needed.
   */
  private readonly choiceLayout = computed(() => {
    const control: HTMLElement | undefined = this.choice()?.nativeElement;
    if (!control || this.orientation() !== 'horizontal') return '';
    const host: HTMLElement = this.elementRef.nativeElement;
    const text =
      '*:data-[slot=field-description]:row-start-2 has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium';
    return control === host.firstElementChild
      ? cn(
          'grid grid-cols-[auto_1fr] gap-y-1 *:col-start-2 [&>:first-child]:col-start-1 [&>:first-child]:row-start-1',
          !this.contentWrapper() && 'w-auto',
          text,
        )
      : cn(
          'grid grid-cols-[1fr_auto] gap-y-1 *:col-start-1 [&>:is([data-slot=checkbox],[data-slot=radio],[data-slot=switch])]:col-start-2 [&>:is([data-slot=checkbox],[data-slot=radio],[data-slot=switch])]:row-start-1',
          text,
        );
  });

  /** A label holding its control and text: its text in the label's look. */
  private readonly isLabel =
    (this.elementRef.nativeElement as HTMLElement).tagName === 'LABEL';

  protected readonly class = computed(() =>
    cn(
      this.isLabel &&
        cn(
          this.labelStyles.label,
          'font-normal tracking-normal normal-case',
          // Its control disabled: its text too (it has no scLabel to dim).
          'has-[>:disabled]:cursor-not-allowed has-[>:disabled]:opacity-50',
        ),
      this.styles.field,
      fieldVariants({ orientation: this.orientation() }),
      this.choiceLayout(),
      this.classInput(),
    ),
  );
}
