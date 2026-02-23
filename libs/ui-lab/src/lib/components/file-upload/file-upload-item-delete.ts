import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import { SC_FILE_UPLOAD } from './file-upload';

@Component({
  selector: 'button[scFileUploadItemDelete]',
  imports: [SiXIcon],
  template: `
    <svg siXIcon></svg>
    <span class="sr-only">Remove file</span>
  `,
  host: {
    'data-slot': 'file-upload-item-delete',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadItemDelete {
  private readonly fileUpload = inject(SC_FILE_UPLOAD);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly fileId = input.required<string>();

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'text-muted-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.fileUpload.removeFile(this.fileId());
  }
}
