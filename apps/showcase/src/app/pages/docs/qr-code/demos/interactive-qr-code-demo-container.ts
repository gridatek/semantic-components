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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-interactive-qr-code-demo',
  imports: [ScQrCode, FormsModule],
  template: \`
    <input
      type="text"
      [(ngModel)]="inputValue"
      placeholder="Enter text or URL..."
      class="w-full max-w-sm px-3 py-2 border rounded-md"
    />
    @if (inputValue) {
      <sc-qr-code [value]="inputValue" [size]="200" />
    }
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveQrCodeDemo {
  inputValue = 'Hello, World!';
}`;
}
