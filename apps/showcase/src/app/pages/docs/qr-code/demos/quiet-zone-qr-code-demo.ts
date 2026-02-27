import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-quiet-zone-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex flex-wrap items-end gap-4">
      <div class="text-center">
        <sc-qr-code
          [value]="'No border'"
          [size]="150"
          [quietZone]="0"
          class="border"
        />
        <p class="text-muted-foreground mt-1 text-xs">No quiet zone</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'Small border'" [size]="150" [quietZone]="1" />
        <p class="text-muted-foreground mt-1 text-xs">1 module</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'Standard border'" [size]="150" [quietZone]="4" />
        <p class="text-muted-foreground mt-1 text-xs">4 modules (standard)</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuietZoneQrCodeDemo {}
