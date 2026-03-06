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
    <div class="flex flex-wrap items-end gap-4">
      <div class="text-center">
        <sc-qr-code [value]="'Small'" [size]="100" />
        <p class="text-muted-foreground mt-1 text-xs">100px</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'Medium'" [size]="150" />
        <p class="text-muted-foreground mt-1 text-xs">150px</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'Large'" [size]="200" />
        <p class="text-muted-foreground mt-1 text-xs">200px</p>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesQrCodeDemo {}
