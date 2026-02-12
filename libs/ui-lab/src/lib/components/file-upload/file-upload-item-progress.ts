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
  selector: '[sc-file-upload-item-progress]',
  template: `
    <div
      class="h-full rounded-full bg-primary transition-all"
      [style.width.%]="file().progress || 0"
    ></div>
  `,
  host: {
    'data-slot': 'file-upload-item-progress',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadItemProgress {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<FileUploadFile>();

  protected readonly class = computed(() =>
    cn('h-1 w-full overflow-hidden rounded-full bg-muted', this.classInput()),
  );
}
