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
        <svg
          scQrCode
          [value]="'No border'"
          [size]="150"
          [border]="0"
          class="border"
        ></svg>
        <p class="text-muted-foreground mt-1 text-xs">No quiet zone</p>
      </div>
      <div class="text-center">
        <svg scQrCode [value]="'Small border'" [size]="150" [border]="1"></svg>
        <p class="text-muted-foreground mt-1 text-xs">1 module</p>
      </div>
      <div class="text-center">
        <svg
          scQrCode
          [value]="'Standard border'"
          [size]="150"
          [border]="4"
        ></svg>
        <p class="text-muted-foreground mt-1 text-xs">4 modules (standard)</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuietZoneQrCodeDemo {}
