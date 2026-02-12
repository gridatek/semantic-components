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
// TagInputTag
// ============================================================================
@Component({
  selector: '[sc-tag-input-tag]',
  template: `
    <span class="truncate">{{ tag() }}</span>
    @if (!tagInput.disabled()) {
      <button
        type="button"
        class="ml-1 rounded-full hover:bg-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
        (click)="remove($event)"
        [attr.aria-label]="'Remove ' + tag()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="size-3"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    }
  `,
  host: {
    'data-slot': 'tag-input-tag',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTagInputTag {
  readonly tagInput = inject(SC_TAG_INPUT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly tag = input.required<string>();
  readonly variant = input<'default' | 'secondary' | 'outline'>('default');

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors',
      'max-w-[150px]',
      this.variant() === 'default' && 'bg-primary text-primary-foreground',
      this.variant() === 'secondary' &&
        'bg-secondary text-secondary-foreground',
      this.variant() === 'outline' && 'border bg-background',
      this.classInput(),
    ),
  );

  remove(event: Event): void {
    event.stopPropagation();
    this.tagInput.removeTag(this.tag());
  }
}
