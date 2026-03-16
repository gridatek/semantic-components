import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex flex-col items-center gap-2">
      <svg
        scQrCode
        [value]="'https://angular.dev'"
        aria-label="QR Code for angular.dev"
      ></svg>
      <p class="text-muted-foreground text-sm">Scan to visit angular.dev</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicQrCodeDemo {}
