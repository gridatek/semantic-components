import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicQrCodeDemoContainer } from './demos/basic-qr-code-demo-container';
import { InteractiveQrCodeDemoContainer } from './demos/interactive-qr-code-demo-container';
import { SizesQrCodeDemoContainer } from './demos/sizes-qr-code-demo-container';
import { ColorsQrCodeDemoContainer } from './demos/colors-qr-code-demo-container';
import { ErrorCorrectionQrCodeDemoContainer } from './demos/error-correction-qr-code-demo-container';
import { LogoQrCodeDemoContainer } from './demos/logo-qr-code-demo-container';
import { QuietZoneQrCodeDemoContainer } from './demos/quiet-zone-qr-code-demo-container';
import { DownloadQrCodeDemoContainer } from './demos/download-qr-code-demo-container';
import { UseCasesQrCodeDemoContainer } from './demos/use-cases-qr-code-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-qr-code-page',
  imports: [
    BasicQrCodeDemoContainer,
    InteractiveQrCodeDemoContainer,
    SizesQrCodeDemoContainer,
    ColorsQrCodeDemoContainer,
    ErrorCorrectionQrCodeDemoContainer,
    LogoQrCodeDemoContainer,
    QuietZoneQrCodeDemoContainer,
    DownloadQrCodeDemoContainer,
    UseCasesQrCodeDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">QrCode</h1>
        <p class="text-muted-foreground">
          Generate QR codes from text or URLs with customizable colors and logo
          support.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-qr-code-demo-container />
        <app-interactive-qr-code-demo-container />
        <app-sizes-qr-code-demo-container />
        <app-colors-qr-code-demo-container />
        <app-error-correction-qr-code-demo-container />
        <app-logo-qr-code-demo-container />
        <app-quiet-zone-qr-code-demo-container />
        <app-download-qr-code-demo-container />
        <app-use-cases-qr-code-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class QrCodePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'qr-code')!
    .status;
}
