import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScBarcodeScanner } from './barcode-scanner';

/**
 * Scans a picture: your `input type=file` — no camera needed, and the way for
 * anyone who cannot aim one. The codes come out of `(detected)`. Label it.
 */
@Directive({
  selector: 'input[type=file][scBarcodeScannerFile]',
  host: {
    'data-slot': 'barcode-scanner-file',
    accept: 'image/*',
    '[disabled]': 'scanner.state() === "unsupported"',
    '[class]': 'class()',
    '(change)': 'onChange($event)',
  },
})
export class ScBarcodeScannerFile {
  protected readonly scanner = inject(ScBarcodeScanner);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-input file:text-foreground h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none file:me-3 file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected async onChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    await this.scanner.scan(file);
    // The same picture again: still a change.
    input.value = '';
  }
}
