import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_TAG_INPUT } from './tag-input';

// ============================================================================
// TagInputClear
// ============================================================================
@Component({
  selector: 'button[scTagInputClear]',
  imports: [SiXIcon],
  template: `
    <svg siXIcon class="size-4"></svg>
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
