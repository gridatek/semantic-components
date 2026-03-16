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
        <div scQrCode [value]="'Small'" [size]="100"></div>
        <p class="text-muted-foreground mt-1 text-xs">100px</p>
      </div>
      <div class="text-center">
        <div scQrCode [value]="'Medium'" [size]="150"></div>
        <p class="text-muted-foreground mt-1 text-xs">150px</p>
      </div>
      <div class="text-center">
        <div scQrCode [value]="'Large'" [size]="200"></div>
        <p class="text-muted-foreground mt-1 text-xs">200px</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesQrCodeDemo {}
