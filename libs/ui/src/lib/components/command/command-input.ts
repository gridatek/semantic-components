import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

import { ScCommand } from './command';

@Component({
  selector: 'sc-command-input',
  imports: [SiSearchIcon, FormsModule],
  template: `
    <svg class="size-4 shrink-0 opacity-50" si-search-icon></svg>
    <input
      class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      #inputElement
      [value]="internalValue"
      [placeholder]="placeholder()"
      [disabled]="disabled"
      (keydown)="onKeydown($event)"
      (input)="onInput($event)"
      data-slot="command-input"
    />
  `,
  host: {
    '[class]': 'class()',
    'data-slot': 'command-input-wrapper',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ScCommandInput,
      multi: true,
    },
  ],
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandInput implements ControlValueAccessor {
  private command = inject(ScCommand, { optional: true });

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('flex h-9 items-center gap-2 border-b px-3', this.classInput()),
  );

  placeholder = input('');

  value = model<string>('');

  readonly search = output<string>();
  readonly keydown = output<KeyboardEvent>();

  // ControlValueAccessor implementation
  internalValue = '';
  disabled = false;
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.internalValue = value || '';
    this.value.set(this.internalValue);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;

    this.internalValue = searchValue;
    this.value.set(searchValue);
    this.onChange(searchValue);

    // Update the parent command component if available
    if (this.command) {
      this.command.updateQuery(searchValue);
    }

    this.search.emit(searchValue);
  }

  onKeydown(event: KeyboardEvent) {
    // Let the parent handle navigation keys
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key) && this.command) {
      // Don't emit keydown for navigation keys, let parent handle
      return;
    }
    this.keydown.emit(event);
  }
}
