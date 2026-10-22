import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScFileUploadItem } from './file-upload-item';

const UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const;

/** The file's size, in the app's language: "1.5 MB". */
@Component({
  selector: '[scFileUploadItemSize]',
  template: `{{ text() }}`,
  host: {
    'data-slot': 'file-upload-item-size',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScFileUploadItemSize {
  private readonly item = inject(ScFileUploadItem);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly text = computed(() => {
    let size = this.item.file().size;
    let unit = 0;
    while (size >= 1000 && unit < UNITS.length - 1) {
      size /= 1000;
      unit++;
    }
    return new Intl.NumberFormat(this.locale, {
      style: 'unit',
      unit: UNITS[unit],
      // "68 bytes" (the short form is "68 byte"), then "2 kB", "1.5 MB".
      unitDisplay: unit ? 'short' : 'long',
      maximumFractionDigits: 1,
    }).format(size);
  });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground shrink-0 text-xs tabular-nums',
      this.classInput(),
    ),
  );
}
