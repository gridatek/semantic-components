import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScFileInputItem } from './file-input-item';

/** An image's thumbnail (decorative: its name is beside it); for other files, your icon. */
@Component({
  selector: '[scFileInputItemPreview]',
  template: `
    @if (url(); as url) {
      <img [src]="url" alt="" class="size-full object-cover" />
    } @else {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'file-input-item-preview',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScFileInputItemPreview {
  private readonly item = inject(ScFileInputItem);
  private readonly styles = injectStyle().fileInput;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly url = signal<string | null>(null);

  private readonly class = computed(() =>
    cn(
      'bg-muted text-muted-foreground flex shrink-0 items-center justify-center overflow-hidden [&_svg:not([class*=size-])]:size-4',
      this.styles.preview,
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
