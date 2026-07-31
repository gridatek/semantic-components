import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UseCasesQrCodeDemo } from './use-cases-qr-code-demo';

@Component({
  selector: 'app-use-cases-qr-code-demo-container',
  imports: [DemoContainer, UseCasesQrCodeDemo],
  template: `
    <app-demo-container
      title="Use Cases"
      demoUrl="/demos/qr-code/use-cases-qr-code-demo"
      [code]="code"
    >
      <app-use-cases-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class UseCasesQrCodeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-use-cases-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      @for (item of useCases; track item.label) {
        <div class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            [value]="item.value"
            class="size-28"
            [attr.aria-label]="item.label"
          ></svg>
          <p class="text-muted-foreground text-xs">{{ item.label }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class UseCasesQrCodeDemo {
  readonly useCases = [
    { value: 'https://angular.dev', label: 'Website URL' },
    { value: 'tel:+1234567890', label: 'Phone Number' },
    { value: 'mailto:hello@example.com', label: 'Email' },
    { value: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', label: 'WiFi' },
  ];
}`;
}
