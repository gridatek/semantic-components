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
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-interactive-qr-code-demo',
  imports: [ScQrCode, FormsModule],
  template: \`
    <div class="flex flex-col items-center gap-6">
      @if (value()) {
        <svg scQrCode [value]="value()" aria-label="QR Code"></svg>
      }

      <div class="flex w-full max-w-sm flex-col gap-3">
        <input
          type="text"
          [ngModel]="value()"
          (ngModelChange)="value.set($event)"
          placeholder="Enter text or URL..."
          class="border-input bg-background rounded-md border px-3 py-2 text-sm"
        />

        <div class="flex gap-2">
          <button
            type="button"
            class="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs"
            (click)="value.set('https://angular.dev')"
          >
            URL
          </button>
          <button
            type="button"
            class="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs"
            (click)="value.set('mailto:hello@example.com')"
          >
            Email
          </button>
          <button
            type="button"
            class="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs"
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
