import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex items-end gap-4 flex-wrap">
      <div class="text-center">
        <sc-qr-code [value]="'Small'" [size]="100" />
        <p class="text-xs text-muted-foreground mt-1">100px</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'Medium'" [size]="150" />
        <p class="text-xs text-muted-foreground mt-1">150px</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'Large'" [size]="200" />
        <p class="text-xs text-muted-foreground mt-1">200px</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesQrCodeDemo {}
