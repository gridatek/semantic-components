import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-phone-input-simple',
  exportAs: 'scPhoneInputSimple',
  template: `
    <div [class]="containerClass()">
      @if (showIcon()) {
        <div
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            />
          </svg>
        </div>
      }
      <input
        #inputEl
        type="tel"
        [class]="inputClass()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="value()"
        (input)="onInput($event)"
        (focus)="focused.set(true)"
        (blur)="onBlur()"
      />
    </div>
  `,
  host: {
    'data-slot': 'phone-input-simple',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPhoneInputSimple {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('(555) 555-5555');
  readonly disabled = input<boolean>(false);
  readonly showIcon = input<boolean>(true);
  readonly format = input<'us' | 'international' | 'none'>('us');

  readonly value = model<string>('');

  protected readonly focused = signal(false);

  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  protected readonly containerClass = computed(() =>
    cn('relative', this.classInput()),
  );

  protected readonly inputClass = computed(() =>
    cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
      this.showIcon() && 'pl-10',
    ),
  );

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatPhoneNumber(input.value);
    this.value.set(formatted);
    input.value = formatted;
  }

  onBlur(): void {
    this.focused.set(false);
  }

  private formatPhoneNumber(value: string): string {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    const format = this.format();

    if (format === 'none') {
      return digits;
    }

    if (format === 'us') {
      // Format as (XXX) XXX-XXXX
      if (digits.length <= 3) {
        return digits;
      } else if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
    }

    if (format === 'international') {
      // Format as +X XXX XXX XXXX
      if (digits.length <= 1) {
        return digits ? `+${digits}` : '';
      } else if (digits.length <= 4) {
        return `+${digits.slice(0, 1)} ${digits.slice(1)}`;
      } else if (digits.length <= 7) {
        return `+${digits.slice(0, 1)} ${digits.slice(1, 4)} ${digits.slice(4)}`;
      } else {
        return `+${digits.slice(0, 1)} ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
      }
    }

    return digits;
  }

  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }

  getRawValue(): string {
    return this.value().replace(/\D/g, '');
  }
}
