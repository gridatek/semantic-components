import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TAG_INPUT } from './tag-input';

// ============================================================================
// TagInputClear
// ============================================================================
@Component({
  selector: 'button[sc-tag-input-clear]',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class="size-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,
  host: {
    'data-slot': 'tag-input-clear',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'tagInput.disabled() || tagInput.tags().length === 0',
    '(click)': 'onClick($event)',
    '[attr.aria-label]': '"Clear all tags"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTagInputClear {
  readonly tagInput = inject(SC_TAG_INPUT);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'ml-auto inline-flex size-6 items-center justify-center rounded-md',
      'text-muted-foreground hover:text-foreground hover:bg-muted',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus:outline-none focus:ring-1 focus:ring-ring',
      this.classInput(),
    ),
  );

  onClick(event: Event): void {
    event.stopPropagation();
    this.tagInput.clearAll();
  }
}
