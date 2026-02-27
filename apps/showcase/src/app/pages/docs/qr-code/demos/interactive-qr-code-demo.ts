import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-interactive-qr-code-demo',
  imports: [ScQrCode, FormsModule],
  template: `
    <input
      type="text"
      [(ngModel)]="inputValue"
      placeholder="Enter text or URL..."
      class="w-full max-w-sm rounded-md border px-3 py-2"
    />
    @if (inputValue) {
      <sc-qr-code [value]="inputValue" [size]="200" />
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveQrCodeDemo {
  inputValue = 'Hello, World!';
}
