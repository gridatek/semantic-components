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
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div class="text-center">
        <sc-qr-code [value]="'https://example.com'" [size]="120" />
        <p class="text-muted-foreground mt-1 text-xs">Website URL</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'tel:+1234567890'" [size]="120" />
        <p class="text-muted-foreground mt-1 text-xs">Phone Number</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'mailto:hello@example.com'" [size]="120" />
        <p class="text-muted-foreground mt-1 text-xs">Email</p>
      </div>
      <div class="text-center">
        <sc-qr-code
          [value]="'WIFI:T:WPA;S:MyNetwork;P:password123;;'"
          [size]="120"
        />
        <p class="text-muted-foreground mt-1 text-xs">WiFi</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCasesQrCodeDemo {}
