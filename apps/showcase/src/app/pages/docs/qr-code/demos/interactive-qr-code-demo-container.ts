import { Component, ViewEncapsulation } from '@angular/core';
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
})
export class InteractiveQrCodeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScButton, ScInput } from '@semantic-components/ui';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-interactive-qr-code-demo',
  imports: [FormField, ScQrCode, ScInput, ScButton],
  template: \`
    <div class="flex flex-col items-center gap-6">
      @if (value()) {
        <svg scQrCode [value]="value()" aria-label="QR Code"></svg>
      }

      <div class="flex w-full max-w-sm flex-col gap-3">
        <input
          scInput
          type="text"
          [formField]="qrCodeForm.text"
          placeholder="Enter text or URL..."
        />

        <div class="flex gap-2">
          <button
            scButton
            variant="secondary"
            size="sm"
            (click)="setValue('https://angular.dev')"
          >
            URL
          </button>
          <button
            scButton
            variant="secondary"
            size="sm"
            (click)="setValue('mailto:hello@example.com')"
          >
            Email
          </button>
          <button
            scButton
            variant="secondary"
            size="sm"
            (click)="setValue('WIFI:T:WPA;S:MyNetwork;P:pass123;;')"
          >
            WiFi
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InteractiveQrCodeDemo {
  readonly formModel = signal({ text: 'https://angular.dev' });
  readonly qrCodeForm = form(this.formModel);

  protected readonly value = computed(() => this.qrCodeForm.text().value());

  protected setValue(value: string) {
    this.qrCodeForm.text().value.set(value);
  }
}`;
}
