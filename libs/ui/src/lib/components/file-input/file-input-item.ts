import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScFileInputList } from './file-input-list';

/**
 * A chosen file: its preview, name, size, a way to remove it. Focusable —
 * the list's Tab stop is one of them; it reads as what it holds.
 */
@Directive({
  selector: 'li[scFileInputItem]',
  host: {
    'data-slot': 'file-input-item',
    '[attr.tabindex]': 'list.active() === file() ? 0 : -1',
    '[class]': 'class()',
    '(focus)': 'list.active.set(file())',
  },
})
export class ScFileInputItem {
  private readonly list = inject(ScFileInputList);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<File>();

  private readonly class = computed(() =>
    cn(
      'bg-card flex items-center gap-3 rounded-lg border p-2 pe-1 text-sm outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );
}
