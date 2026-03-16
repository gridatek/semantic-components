import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ErrorCorrectionQrCodeDemo } from './error-correction-qr-code-demo';

@Component({
  selector: 'app-error-correction-qr-code-demo-container',
  imports: [DemoContainer, ErrorCorrectionQrCodeDemo],
  template: `
    <app-demo-container
      title="Error Correction"
      demoUrl="/demos/qr-code/error-correction-qr-code-demo"
      [code]="code"
    >
      <app-error-correction-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorCorrectionQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode, ScQrCodeEcc } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-error-correction-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <div class="flex flex-wrap gap-6">
      @for (item of levels; track item.ecc) {
        <div class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            [value]="'Error Correction'"
            [ecc]="item.ecc"
            class="size-36"
            [attr.aria-label]="item.label"
          ></svg>
          <p class="text-muted-foreground text-xs">{{ item.label }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorCorrectionQrCodeDemo {
  readonly levels: { ecc: ScQrCodeEcc; label: string }[] = [
    { ecc: 'L', label: 'Low (7%)' },
    { ecc: 'M', label: 'Medium (15%)' },
    { ecc: 'Q', label: 'Quartile (25%)' },
    { ecc: 'H', label: 'High (30%)' },
  ];
}`;
}
