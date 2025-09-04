import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'sc-command-input',
  imports: [SiSearchIcon, FormsModule],
  template: `
    <svg class="mr-2 size-4 shrink-0 opacity-50" si-search-icon></svg>
    <input
      class="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      #inputElement
      [(ngModel)]="value"
      [placeholder]="placeholder()"
      (keydown)="onKeydown($event)"
      (input)="onInput($event)"
    />
  `,
  host: {
    '[class]': 'classes()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandInput {
  class = input<string>('');

  classes = computed(() => cn('flex items-center border-b px-3', this.class()));

  placeholder = input('');

  value = model<string>('');

  readonly search = output<string>();
  readonly keydown = output<KeyboardEvent>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }

  onKeydown(event: KeyboardEvent) {
    this.keydown.emit(event);
  }
}
