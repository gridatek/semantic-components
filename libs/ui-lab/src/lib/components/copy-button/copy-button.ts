import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'button[sc-copy-button]',
  exportAs: 'scCopyButton',
  template: `
    @if (copied()) {
      <!-- Check icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        [class]="iconClass()"
        class="text-green-500"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    } @else {
      <!-- Copy icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        [class]="iconClass()"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'copy-button',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.data-copied]': 'copied() || null',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'copy()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCopyButton {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly timeout = input<number>(2000);
  readonly variant = input<'default' | 'ghost' | 'outline'>('ghost');
  readonly size = input<'sm' | 'default' | 'lg' | 'icon'>('icon');

  readonly copySuccess = output<string>();
  readonly copyError = output<Error>();

  readonly copied = signal(false);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50',
      // Variants
      this.variant() === 'default' &&
        'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      this.variant() === 'ghost' &&
        'hover:bg-accent hover:text-accent-foreground',
      this.variant() === 'outline' &&
        'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      // Sizes
      this.size() === 'sm' && 'h-8 px-3 text-xs',
      this.size() === 'default' && 'h-9 px-4 py-2 text-sm',
      this.size() === 'lg' && 'h-10 px-8 text-sm',
      this.size() === 'icon' && 'size-9',
      this.classInput(),
    ),
  );

  protected readonly iconClass = computed(() =>
    cn(
      this.size() === 'sm' && 'size-3.5',
      this.size() === 'default' && 'size-4',
      this.size() === 'lg' && 'size-5',
      this.size() === 'icon' && 'size-4',
    ),
  );

  protected readonly ariaLabel = computed(() =>
    this.copied() ? 'Copied to clipboard' : 'Copy to clipboard',
  );

  async copy(): Promise<void> {
    if (this.disabled() || this.copied()) return;

    try {
      await navigator.clipboard.writeText(this.value());
      this.copied.set(true);
      this.copySuccess.emit(this.value());

      // Clear any existing timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      // Reset after timeout
      this.timeoutId = setTimeout(() => {
        this.copied.set(false);
        this.timeoutId = null;
      }, this.timeout());
    } catch (error) {
      this.copyError.emit(
        error instanceof Error ? error : new Error('Failed to copy'),
      );
    }
  }

  reset(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.copied.set(false);
  }
}
