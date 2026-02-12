import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-use-cases-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center">
        <sc-qr-code [value]="'https://example.com'" [size]="120" />
        <p class="text-xs text-muted-foreground mt-1">Website URL</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'tel:+1234567890'" [size]="120" />
        <p class="text-xs text-muted-foreground mt-1">Phone Number</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'mailto:hello@example.com'" [size]="120" />
        <p class="text-xs text-muted-foreground mt-1">Email</p>
      </div>
      <div class="text-center">
        <sc-qr-code
          [value]="'WIFI:T:WPA;S:MyNetwork;P:password123;;'"
          [size]="120"
        />
        <p class="text-xs text-muted-foreground mt-1">WiFi</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCasesQrCodeDemo {}
