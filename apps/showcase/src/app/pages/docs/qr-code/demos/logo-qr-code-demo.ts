import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-logo-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <sc-qr-code
      [value]="'https://angular.io'"
      [size]="200"
      [errorCorrectionLevel]="'H'"
      [logo]="'https://angular.io/assets/images/logos/angular/angular.svg'"
      [logoSize]="0.25"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoQrCodeDemo {}
