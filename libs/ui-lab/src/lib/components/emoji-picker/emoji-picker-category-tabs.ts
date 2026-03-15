import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

@Component({
  selector: 'div[scEmojiPickerCategoryTabs]',
  template: `
    @for (category of state.categories(); track category.id) {
      <button
        type="button"
        [class]="categoryTabClass(category.id === state.activeCategory())"
        (click)="state.activeCategory.set(category.id)"
        [attr.aria-label]="category.name"
        [attr.aria-pressed]="category.id === state.activeCategory()"
      >
        {{ category.icon }}
      </button>
    }
  `,
  host: {
    'data-slot': 'emoji-picker-category-tabs',
    role: 'tablist',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEmojiPickerCategoryTabs {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex overflow-x-auto border-b', this.classInput()),
  );

  protected categoryTabClass(isActive: boolean): string {
    return cn(
      'shrink-0 p-2 text-lg hover:bg-accent transition-colors',
      isActive && 'bg-accent',
    );
  }
}
