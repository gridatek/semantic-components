import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  contentChild,
  Directive,
  ElementRef,
  inject,
  InjectionToken,
  input,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const fieldVariants = cva(
  'gap-2 group/field flex w-full data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto',
        horizontal:
          'flex-row items-center [&>[data-slot=label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        responsive:
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
);

export type ScFieldVariants = VariantProps<typeof fieldVariants>;

export interface ScFieldContext {
  id: () => string;
}

export const SC_FIELD = new InjectionToken<ScFieldContext>('SC_FIELD');

@Directive({
  selector: 'div[sc-field], label[sc-field]',
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'field',
    '[attr.id]': 'id()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-invalid]': 'invalid()',
    '[attr.data-disabled]': 'disabled()',
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly id = input(inject(_IdGenerator).getId('sc-field-'));
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScFieldVariants['orientation']>('vertical');
  readonly invalidInput = input<boolean>(false, { alias: 'invalid' });
  readonly disabledInput = input<boolean>(false, { alias: 'disabled' });

  private readonly formFieldDirective = contentChild(FormField);

  protected readonly role = computed(() => {
    // Only LABEL preserves native semantics, DIV gets role="group"
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });

  readonly invalid = computed(() => {
    if (this.invalidInput()) return true;
    return this.formFieldDirective()?.state().invalid() ?? false;
  });

  readonly disabled = computed(() => {
    if (this.disabledInput()) return true;
    return this.formFieldDirective()?.state().disabled() ?? false;
  });

  protected readonly class = computed(() =>
    cn(fieldVariants({ orientation: this.orientation() }), this.classInput()),
  );
}
