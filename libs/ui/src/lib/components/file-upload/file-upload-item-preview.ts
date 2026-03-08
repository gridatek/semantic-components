import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScFileUploadFile } from './file-upload';

@Component({
  selector: '[scFileUploadItemPreview]',
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
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<ScFileUploadFile>();

  protected readonly isImage = computed(() =>
    this.file().file.type.startsWith('image/'),
  );

  protected readonly previewUrl = signal('');

  constructor() {
    effect(() => {
      const prev = this.previewUrl();
      if (prev) {
        URL.revokeObjectURL(prev);
      }

      if (this.isImage()) {
        this.previewUrl.set(URL.createObjectURL(this.file().file));
      } else {
        this.previewUrl.set('');
      }
    });

    this.destroyRef.onDestroy(() => {
      const url = this.previewUrl();
      if (url) {
        URL.revokeObjectURL(url);
      }
    });
  }

  protected readonly class = computed(() =>
    cn(
      'flex size-10 items-center justify-center overflow-hidden rounded bg-muted',
      this.classInput(),
    ),
  );
}
