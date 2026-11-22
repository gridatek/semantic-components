import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScFileInputItem } from './file-input-item';

const UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const;

/** A size in bytes, in a language: "68 bytes", "2 kB", "1.5 MB". */
export function formatFileSize(bytes: number, locale: string): string {
  let size = bytes;
  let unit = 0;
  while (size >= 1000 && unit < UNITS.length - 1) {
    size /= 1000;
    unit++;
  }
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: UNITS[unit],
    // "68 bytes" (the short form is "68 byte"), then "2 kB", "1.5 MB".
    unitDisplay: unit ? 'short' : 'long',
    maximumFractionDigits: 1,
  }).format(size);
}

/** The file's size, in the app's language. */
@Component({
  selector: '[scFileInputItemSize]',
  template: `{{ text() }}`,
  host: {
    'data-slot': 'file-input-item-size',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScFileInputItemSize {
  private readonly item = inject(ScFileInputItem);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly text = computed(() =>
    formatFileSize(this.item.file().size, this.locale),
  );

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground shrink-0 text-xs tabular-nums',
      this.classInput(),
    ),
  );
}
