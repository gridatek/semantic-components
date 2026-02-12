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
  selector: '[sc-file-upload-item]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'file-upload-item',
    '[class]': 'class()',
    '[attr.data-status]': 'file().status',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<FileUploadFile>();

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-3 rounded-lg border bg-background p-3',
      'data-[status=error]:border-destructive data-[status=error]:bg-destructive/10',
      this.classInput(),
    ),
  );
}
