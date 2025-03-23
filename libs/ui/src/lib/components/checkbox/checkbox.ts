import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

export interface ScCheckboxChange {
  checked: boolean;
  value: string;
}

@Component({
  selector: 'input[sc-checkbox]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[id]': 'id()',
    '[type]': 'type()',
    '[class]': 'class()',
    '[checked]': 'checked()',
    '(click)': 'handleClick($event)',
    'data-slot': 'control',
  },
  styles: `
    :root {
      --checkbox-checked-bg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
      --checkbox-indeterminate-bg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-minus'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCheckbox {
  private readonly hostRef = inject(ElementRef);

  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-checkbox-'), {
    alias: 'id',
  });
  readonly id = linkedSignal(() => this.idInput());

  readonly type = input<'checkbox'>('checkbox');

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      //Base styles
      'appearance-none', //removes default browser styling
      'size-4', //sets width and height (16px)
      'shrink-0',
      'border border-primary', //adds border
      'rounded-sm', //adds border radius
      'shadow',
      // 'bg-white', //sets background color
      'cursor-pointer',
      'outline-none',
      'transition-all duration-200', //adds smooth transitions

      //Interactive states
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',

      //Checked state
      'checked:bg-primary',
      'checked:text-primary-foreground',
      // Applies SVG background image when checked
      '[&:checked]:bg-[image:var(--checkbox-checked-bg)]',
      'checked:bg-no-repeat', // Prevents background image from repeating
      'checked:bg-center', // Centers the background image
      'checked:bg-contain', // Scales image to fit while maintaining aspect ratio

      //Indeterminate state
      'indeterminate:bg-primary',
      'indeterminate:text-primary-foreground',
      '[&:indeterminate]:bg-[image:var(--checkbox-indeterminate-bg)]',
      'indeterminate:bg-no-repeat', // Prevents background image from repeating
      'indeterminate:bg-center', // Centers the background image
      'indeterminate:bg-contain', // Scales image to fit while maintaining aspect ratio

      //Disabled state
      'disabled:opacity-50', //styles for disabled state
      'disabled:cursor-not-allowed', //changes cursor

      this.classInput(),
    ),
  );

  readonly indeterminateInput = input<boolean, unknown>(false, {
    alias: 'indeterminate',
    transform: booleanAttribute,
  });
  private readonly indeterminate = linkedSignal(() => this.indeterminateInput());

  readonly checkedInput = input<boolean, unknown>(false, {
    alias: 'checked',
    transform: booleanAttribute,
  });
  protected readonly checked = linkedSignal(() => this.checkedInput());
  readonly checkedChange = output<boolean>();

  readonly value = input<string>('');
  readonly change = output<ScCheckboxChange>();

  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  constructor() {
    afterRenderEffect(() => {
      this.hostRef.nativeElement.indeterminate = this.indeterminate();
    });
  }

  protected handleClick(event: MouseEvent): void {
    if (this.indeterminate()) {
      this.indeterminate.set(false);
    }

    this.checked.update((checked: boolean) => !checked);
    this.checkedChange.emit(this.checked());
    this.change.emit({ checked: this.checked(), value: this.value() });
    event.preventDefault();
  }
}
