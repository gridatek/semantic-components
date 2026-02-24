import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { buttonVariants, cn } from '@semantic-components/ui';

@Component({
  selector: 'button[scCodeEditorCopyButton]',
  imports: [SiCheckIcon, SiCopyIcon],
  template: `
    @if (copied()) {
      <svg siCheckIcon class="size-4"></svg>
    } @else {
      <svg siCopyIcon class="size-4"></svg>
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
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'text-muted-foreground',
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
