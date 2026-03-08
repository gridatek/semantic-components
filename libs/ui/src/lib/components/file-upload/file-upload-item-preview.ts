import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  untracked,
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
  private readonly destroyRef = inject(DestroyRef);
  readonly item = inject(SC_FILE_UPLOAD_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isImage = computed(() =>
    this.item.file().file.type.startsWith('image/'),
  );

  protected readonly previewUrl = computed(() => {
    const file = this.item.file();
    if (file.file.type.startsWith('image/')) {
      return URL.createObjectURL(file.file);
    }
    return '';
  });

  constructor() {
    // Revoke previous object URL when file changes
    effect((onCleanup) => {
      const url = this.previewUrl();
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
