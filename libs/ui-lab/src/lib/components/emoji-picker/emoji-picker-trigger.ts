import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'button[sc-emoji-picker-trigger]',
  template: `
    <ng-content>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    </ng-content>
  `,
  host: {
    'data-slot': 'emoji-picker-trigger',
    type: 'button',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEmojiPickerTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-md p-2',
      'hover:bg-accent hover:text-accent-foreground transition-colors',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      this.classInput(),
    ),
  );
}
