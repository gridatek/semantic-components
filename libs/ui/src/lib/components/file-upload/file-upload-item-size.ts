import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD_ITEM } from './file-upload-item';

@Component({
  selector: '[scFileUploadItemSize]',
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
  private readonly item = inject(SC_FILE_UPLOAD_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly formattedSize = computed(() => {
    const bytes = this.item.file().file.size;
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
