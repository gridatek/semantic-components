import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD_ITEM } from './file-upload-item';

@Component({
  selector: '[scFileUploadItemPreview]',
  template: `
    @if (isImage()) {
      <img
        [src]="previewUrl()"
        [alt]="item.file().file.name"
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
  readonly item = inject(SC_FILE_UPLOAD_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isImage = computed(() =>
    this.item.file().file.type.startsWith('image/'),
  );

  protected readonly previewUrl = signal('');

  constructor() {
    // effect owns the full lifecycle: create URL on file change, revoke on cleanup/destroy
    effect((onCleanup) => {
      const file = this.item.file();
      let url = '';
      if (file.file.type.startsWith('image/')) {
        url = URL.createObjectURL(file.file);
      }
      this.previewUrl.set(url);

      onCleanup(() => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    });
  }

  protected readonly class = computed(() =>
    cn(
      'flex size-10 items-center justify-center overflow-hidden rounded bg-muted',
      this.classInput(),
    ),
  );
}
