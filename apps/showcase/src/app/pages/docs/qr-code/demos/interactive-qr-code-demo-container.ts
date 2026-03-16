import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InteractiveQrCodeDemo } from './interactive-qr-code-demo';

@Component({
  selector: 'app-interactive-qr-code-demo-container',
  imports: [DemoContainer, InteractiveQrCodeDemo],
  template: `
    <app-demo-container
      title="Interactive"
      demoUrl="/demos/qr-code/interactive-qr-code-demo"
      [code]="code"
    >
      <app-interactive-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScButton, ScInput } from '@semantic-components/ui';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-interactive-qr-code-demo',
  imports: [ScQrCode, ScInput, ScButton, FormsModule],
  template: \`
    <div class="flex flex-col items-center gap-6">
      @if (value()) {
        <svg scQrCode [value]="value()" aria-label="QR Code"></svg>
      }

      <div class="flex w-full max-w-sm flex-col gap-3">
        <input
          scInput
          type="text"
          [ngModel]="value()"
          (ngModelChange)="value.set($event)"
          placeholder="Enter text or URL..."
        />

        <div class="flex gap-2">
          <button
            scButton
            variant="secondary"
            size="sm"
            (click)="value.set('https://angular.dev')"
          >
            URL
          </button>
          <button
            scButton
            variant="secondary"
            size="sm"
            (click)="value.set('mailto:hello@example.com')"
          >
            Email
          </button>
          <button
            scButton
            variant="secondary"
            size="sm"
            (click)="value.set('WIFI:T:WPA;S:MyNetwork;P:pass123;;')"
          >
            WiFi
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveQrCodeDemo {
  readonly value = signal('https://angular.dev');
}`;
}
