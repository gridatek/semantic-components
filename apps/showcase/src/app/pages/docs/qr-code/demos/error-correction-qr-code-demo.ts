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
    <div class="flex gap-4 flex-wrap">
      <div class="text-center">
        <sc-qr-code
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'L'"
        />
        <p class="text-xs text-muted-foreground mt-1">Low (7%)</p>
      </div>
      <div class="text-center">
        <sc-qr-code
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'M'"
        />
        <p class="text-xs text-muted-foreground mt-1">Medium (15%)</p>
      </div>
      <div class="text-center">
        <sc-qr-code
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'Q'"
        />
        <p class="text-xs text-muted-foreground mt-1">Quartile (25%)</p>
      </div>
      <div class="text-center">
        <sc-qr-code
          [value]="'Error Correction Test'"
          [size]="150"
          [errorCorrectionLevel]="'H'"
        />
        <p class="text-xs text-muted-foreground mt-1">High (30%)</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorCorrectionQrCodeDemo {}
