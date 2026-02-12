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
  selector: '[sc-file-upload-item-preview]',
  template: `
    @if (isImage()) {
      <img
        [src]="previewUrl()"
        [alt]="file().file.name"
        class="size-full object-cover"
      />
    } @else {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'file-upload-item-preview',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadItemPreview {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<FileUploadFile>();

  protected readonly isImage = computed(() =>
    this.file().file.type.startsWith('image/'),
  );

  protected readonly previewUrl = computed(() => {
    if (this.isImage()) {
      return URL.createObjectURL(this.file().file);
    }
    return '';
  });

  protected readonly class = computed(() =>
    cn(
      'flex size-10 items-center justify-center overflow-hidden rounded bg-muted',
      this.classInput(),
    ),
  );
}
