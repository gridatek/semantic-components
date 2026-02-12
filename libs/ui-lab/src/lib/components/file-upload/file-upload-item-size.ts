import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { FileUploadFile } from './file-upload';

@Component({
  selector: '[sc-file-upload-item-size]',
  template: `
    {{ formattedSize() }}
  `,
  host: {
    'data-slot': 'file-upload-item-size',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadItemSize {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<FileUploadFile>();

  protected readonly formattedSize = computed(() => {
    const bytes = this.file().file.size;
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  });

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );
}
