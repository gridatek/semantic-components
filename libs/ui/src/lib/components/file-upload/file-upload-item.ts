import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { ScFileUploadFile } from './file-upload';

@Directive({
  selector: '[scFileUploadItem]',
  host: {
    'data-slot': 'file-upload-item',
    '[class]': 'class()',
    '[attr.data-status]': 'file().status',
  },
})
export class ScFileUploadItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<ScFileUploadFile>();

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-3 rounded-lg border bg-background p-3',
      'data-[status=error]:border-destructive data-[status=error]:bg-destructive/10',
      this.classInput(),
    ),
  );
}
