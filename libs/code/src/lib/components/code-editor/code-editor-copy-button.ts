import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import { buttonVariants, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'button[scCodeEditorCopyButton]',
  exportAs: 'scCodeEditorCopyButton',
  imports: [SiCheckIcon, SiCopyIcon],
  template: `
    @if (copied()) {
      <svg siCheckIcon class="size-4"></svg>
    } @else {
      <svg siCopyIcon class="size-4"></svg>
    }
  `,
  host: {
    '[class]': 'class()',
    type: 'button',
    '(click)': 'copyCode($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCodeEditorCopyButton {
  readonly code = input.required<string>();
  readonly classInput = input<string>('', { alias: 'class' });

  /** Whether the code was just copied (for two seconds): name the button with it. */
  readonly copied = signal(false);

  constructor() {
    ɵwarnIfUnnamed('scCodeEditorCopyButton');
  }

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'text-muted-foreground',
      this.classInput(),
    ),
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
