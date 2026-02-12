import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScOptField } from './opt-field';
import { ScOptFieldSlotInput } from './opt-field-slot-input';
import { ScOptFieldSlotCaret } from './opt-field-slot-caret';
import { ScOptFieldSlotChar } from './opt-field-slot-char';

@Component({
  selector: 'sc-opt-field-slot',
  imports: [ScOptFieldSlotInput, ScOptFieldSlotCaret, ScOptFieldSlotChar],
  host: {
    'data-slot': 'opt-field-slot',
    '[class]': 'class()',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.data-filled]': 'isFilled() ? "" : null',
  },
  template: `
    <input
      #input
      sc-opt-field-slot-input
      [value]="char()"
      [disabled]="optField.disabled()"
      (inputChange)="onInputChange($event)"
      (keydownEvent)="onKeydown($event)"
      (focused)="onFocusChange($event)"
    />
    @if (isActive() && !isFilled()) {
      <div sc-opt-field-slot-caret></div>
    }
    <span sc-opt-field-slot-char [char]="char()"></span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScOptFieldSlot {
  readonly optField = inject(ScOptField);
  private readonly inputComponent = viewChild.required(ScOptFieldSlotInput);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly index = signal<number>(0);
  private readonly focused = signal<boolean>(false);

  readonly char = computed(() => this.optField.getChar(this.index()));
  readonly isActive = computed(
    () => this.focused() && !this.optField.disabled(),
  );
  readonly isFilled = computed(() => this.char() !== '');

  protected readonly class = computed(() =>
    cn(
      'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
      this.isActive() && 'z-10 ring-2 ring-ring ring-offset-background',
      this.classInput(),
    ),
  );

  setIndex(idx: number): void {
    this.index.set(idx);
  }

  focus(): void {
    this.inputComponent().focus();
  }

  protected onFocusChange(isFocused: boolean): void {
    this.focused.set(isFocused);
  }

  protected onInputChange(char: string): void {
    if (this.optField.disabled()) return;

    this.optField.setChar(this.index(), char);
    // Move to next slot
    this.optField.focusSlot(this.index() + 1);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.optField.disabled()) return;

    if (event.key === 'Backspace') {
      if (this.char() === '') {
        // Move to previous slot and clear it
        const prevIndex = this.index() - 1;
        if (prevIndex >= 0) {
          this.optField.setChar(prevIndex, '');
          this.optField.focusSlot(prevIndex);
        }
      } else {
        // Clear current slot
        this.optField.setChar(this.index(), '');
      }
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      this.optField.focusSlot(this.index() - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.optField.focusSlot(this.index() + 1);
      event.preventDefault();
    }
  }
}
