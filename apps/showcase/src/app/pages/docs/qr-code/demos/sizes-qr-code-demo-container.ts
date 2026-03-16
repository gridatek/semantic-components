import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesQrCodeDemo } from './sizes-qr-code-demo';

@Component({
  selector: 'app-sizes-qr-code-demo-container',
  imports: [DemoContainer, SizesQrCodeDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/qr-code/sizes-qr-code-demo"
      [code]="code"
    >
      <app-sizes-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <div class="flex flex-wrap items-end gap-4">
      <div class="text-center">
        <div scQrCode [value]="'Small'" class="size-24"></div>
        <p class="text-muted-foreground mt-1 text-xs">96px</p>
      </div>
      <div class="text-center">
        <div scQrCode [value]="'Medium'" class="size-36"></div>
        <p class="text-muted-foreground mt-1 text-xs">144px</p>
      </div>
      <div class="text-center">
        <div scQrCode [value]="'Large'" class="size-52"></div>
        <p class="text-muted-foreground mt-1 text-xs">208px</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesQrCodeDemo {}`;
}
