import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerItem } from './emoji-picker-item';
import { ScEmojiPickerState } from './emoji-picker-state';

@Component({
  selector: 'div[scEmojiPickerGrid]',
  imports: [ScEmojiPickerItem],
  template: `
    @if (state.searchQuery()) {
      @if (state.filteredEmojis().length > 0) {
        <div class="p-2">
          <div
            class="grid gap-1"
            [style.grid-template-columns]="state.gridColumns()"
          >
            @for (emoji of state.filteredEmojis(); track emoji.emoji) {
              <button scEmojiPickerItem [emoji]="emoji">
                {{ emoji.emoji }}
              </button>
            }
          </div>
        </div>
      } @else {
        <ng-content select="[scEmojiPickerEmpty]">
          <div class="text-muted-foreground p-4 text-center text-sm">
            No emoji found
          </div>
        </ng-content>
      }
    } @else {
      <div class="p-2">
        <div
          class="grid gap-1"
          [style.grid-template-columns]="state.gridColumns()"
        >
          @for (emoji of state.activeCategoryEmojis(); track emoji.emoji) {
            <button scEmojiPickerItem [emoji]="emoji">
              {{ emoji.emoji }}
            </button>
          }
        </div>
      </div>
    }
  `,
  host: {
    'data-slot': 'emoji-picker-grid',
    role: 'grid',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEmojiPickerGrid {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block h-64 overflow-y-auto', this.classInput()),
  );
}
