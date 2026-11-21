import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
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
  private readonly scanner = inject(ScBarcodeScanner);
  private readonly inputStyles = injectStyle().input;

  readonly classInput = input<string>('', { alias: 'class' });

  // The style's input: it draws a file input too.
  private readonly class = computed(() =>
    cn(this.inputStyles, this.classInput()),
  );

  private async onChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    await this.scanner.scan(file);
    // The same picture again: still a change.
    input.value = '';
  }
}
