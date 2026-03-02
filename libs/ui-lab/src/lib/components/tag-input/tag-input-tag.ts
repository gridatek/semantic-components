import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import { SC_TAG_INPUT } from './tag-input';

// ============================================================================
// TagInputTag
// ============================================================================
@Component({
  selector: '[scTagInputTag]',
  imports: [SiXIcon],
  template: `
    <span class="truncate">{{ tag() }}</span>
    @if (!tagInput.disabled()) {
      <button
        type="button"
        class="hover:bg-foreground/20 focus:ring-ring ml-1 rounded-full focus:ring-1 focus:outline-none"
        (click)="remove($event)"
        [attr.aria-label]="'Remove ' + tag()"
      >
        <svg siXIcon class="size-3"></svg>
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
