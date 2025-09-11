import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';

import { ScCheckbox, ScCheckboxChange } from '../checkbox/checkbox';

@Component({
  selector: 'sc-checkbox-group',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    'data-slot': 'control',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScCheckboxGroup),
      multi: true,
    },
  ],
})
export class ScCheckboxGroup implements AfterContentInit, ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('space-y-2', this.classInput()));

  readonly disabledInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly disabled = linkedSignal(() => this.disabledInput());

  readonly value = model<string[]>([]);

  readonly checkboxes = contentChildren(ScCheckbox, { descendants: true });

  ngAfterContentInit() {
    this.checkboxes().forEach((checkbox) => {
      checkbox.change.subscribe((c: ScCheckboxChange) => {
        let values = this.value();
        if (c.checked) {
          values = [...values, c.value];
        } else {
          values = values.filter((v) => v !== c.value);
        }
        this.setValue(values);
      });
    });
  }

  private setValue(value: string[]) {
    this.value.set(value);

    this.onChange(value);
    this.changeDetectorRef.markForCheck();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string[]) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(value: string[]): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
