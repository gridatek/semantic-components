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
    <sc-qr-code [value]="'https://angular.io'" [size]="200" />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicQrCodeDemo {}
