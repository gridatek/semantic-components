import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A chosen file: its preview, name, size, and a way to remove it. */
@Directive({
  selector: 'li[scFileUploadNextItem]',
  host: {
    'data-slot': 'file-upload-item',
    '[class]': 'class()',
  },
})
export class ScFileUploadNextItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<File>();

  protected readonly class = computed(() =>
    cn(
      'bg-card flex items-center gap-3 rounded-lg border p-2 pe-1 text-sm',
      this.classInput(),
    ),
  );
}
