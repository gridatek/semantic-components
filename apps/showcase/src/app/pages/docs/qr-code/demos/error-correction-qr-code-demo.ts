import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-error-correction-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex flex-wrap gap-4">
      <div class="text-center">
        <svg
          scQrCode
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'L'"
        ></svg>
        <p class="text-muted-foreground mt-1 text-xs">Low (7%)</p>
      </div>
      <div class="text-center">
        <svg
          scQrCode
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'M'"
        ></svg>
        <p class="text-muted-foreground mt-1 text-xs">Medium (15%)</p>
      </div>
      <div class="text-center">
        <svg
          scQrCode
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'Q'"
        ></svg>
        <p class="text-muted-foreground mt-1 text-xs">Quartile (25%)</p>
      </div>
      <div class="text-center">
        <svg
          scQrCode
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'H'"
        ></svg>
        <p class="text-muted-foreground mt-1 text-xs">High (30%)</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorCorrectionQrCodeDemo {}
