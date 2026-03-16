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
    <svg
      scQrCode
      [value]="'https://angular.dev'"
      [size]="200"
      [errorCorrectionLevel]="'H'"
      [logo]="'https://github.com/angular.png'"
      [logoSize]="0.25"
    ></svg>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoQrCodeDemo {}
