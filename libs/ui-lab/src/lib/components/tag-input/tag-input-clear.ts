import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_TAG_INPUT } from './tag-input';

// ============================================================================
// TagInputClear
// ============================================================================
@Component({
  selector: 'button[scTagInputClear]',
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
    '[attr.aria-disabled]':
      'tagInput.disabled() || tagInput.tags().length === 0 || null',
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
      buttonVariants({ variant: 'ghost', size: 'icon-xs' }),
      'ml-auto text-muted-foreground',
      this.classInput(),
    ),
  );

  onClick(event: Event): void {
    event.stopPropagation();
    this.tagInput.clearAll();
  }
}
