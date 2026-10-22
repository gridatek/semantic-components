import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScFileUploadItem } from './file-upload-item';

/** An image's thumbnail; for other files, your icon. */
@Component({
  selector: '[scFileUploadItemPreview]',
  template: `
    @if (url(); as url) {
      <img [src]="url" alt="" class="size-full object-cover" />
    } @else {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'file-upload-item-preview',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScFileUploadItemPreview {
  private readonly item = inject(ScFileUploadItem);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly url = signal<string | null>(null);

  protected readonly class = computed(() =>
    cn(
      'bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md [&_svg:not([class*=size-])]:size-5',
      this.classInput(),
    ),
  );

  constructor() {
    // An image's URL, for as long as it is shown.
    effect((onCleanup) => {
      const file = this.item.file();
      if (!file.type.startsWith('image/')) {
        this.url.set(null);
        return;
      }
      const url = URL.createObjectURL(file);
      this.url.set(url);
      onCleanup(() => URL.revokeObjectURL(url));
    });
  }
}
