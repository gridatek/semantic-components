import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_FILE_UPLOAD } from './file-upload';

@Component({
  selector: 'button[scFileUploadTrigger]',
  template: `
    <input
      #fileInput
      type="file"
      class="sr-only"
      [multiple]="fileUpload.multiple()"
      [accept]="fileUpload.accept()"
      [disabled]="fileUpload.disabled()"
      (change)="onFileSelect($event)"
    />
    <ng-content />
  `,
  host: {
    'data-slot': 'file-upload-trigger',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'fileUpload.disabled()',
    '[attr.aria-disabled]': 'fileUpload.disabled() || null',
    '(click)': 'openFilePicker($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadTrigger {
  readonly fileUpload = inject(SC_FILE_UPLOAD);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'default', size: 'lg' }), this.classInput()),
  );

  openFilePicker(event: Event): void {
    event.preventDefault();
    if (this.fileUpload.disabled()) return;
    const input = this.elementRef.nativeElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    input?.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileUpload.addFiles(input.files);
      input.value = '';
    }
  }
}
