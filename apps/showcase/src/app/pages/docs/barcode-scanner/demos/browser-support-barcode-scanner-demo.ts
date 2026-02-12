import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-browser-support-barcode-scanner-demo',
  template: `
    <div class="space-y-3">
      <ul class="text-sm space-y-1 list-disc list-inside text-muted-foreground">
        <li>Chrome 83+ (desktop and Android)</li>
        <li>Edge 83+</li>
        <li>Opera 69+</li>
        <li>Chrome for Android</li>
        <li>Samsung Internet</li>
      </ul>
      <p class="text-sm text-muted-foreground">
        Not supported in Firefox or Safari (as of 2024).
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserSupportBarcodeScannerDemo {}
