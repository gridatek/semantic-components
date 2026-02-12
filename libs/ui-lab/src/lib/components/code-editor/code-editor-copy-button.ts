import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'button[sc-code-editor-copy-button]',
  template: `
    @if (copied()) {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    } @else {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    }
  `,
  host: {
    'data-slot': 'code-editor-copy-button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    type: 'button',
    '(click)': 'copyCode($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCodeEditorCopyButton {
  readonly code = input.required<string>();
  readonly classInput = input<string>('', { alias: 'class' });

  readonly copied = signal(false);

  protected readonly class = computed(() =>
    cn(
      'rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
      this.classInput(),
    ),
  );

  protected readonly ariaLabel = computed(() =>
    this.copied() ? 'Copied!' : 'Copy code',
  );

  protected async copyCode(event: Event): Promise<void> {
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}
