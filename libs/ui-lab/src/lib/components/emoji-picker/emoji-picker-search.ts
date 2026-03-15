import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

@Directive({
  selector: 'input[scEmojiPickerSearch]',
  host: {
    'data-slot': 'emoji-picker-search',
    type: 'text',
    placeholder: 'Search emoji...',
    '[class]': 'class()',
    '[value]': 'state.searchQuery()',
    '(input)': 'onInput($event)',
  },
})
export class ScEmojiPickerSearch {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm',
      'placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring',
      this.classInput(),
    ),
  );

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.state.searchQuery.set(input.value);
  }
}
