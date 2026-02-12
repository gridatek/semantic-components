import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD } from './file-upload';

@Component({
  selector: 'button[sc-file-upload-item-delete]',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
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
      'inline-flex size-8 items-center justify-center rounded-md text-muted-foreground',
      'transition-colors hover:bg-accent hover:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.fileUpload.removeFile(this.fileId());
  }
}
