import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSeparatorDemo } from './basic-separator-demo';

@Component({
  selector: 'app-basic-separator-demo-container',
  imports: [DemoContainer, BasicSeparatorDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-separator-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSeparatorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSeparator } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-separator-demo',
  imports: [ScSeparator],
  template: \`
    <div>
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
        <p class="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <div sc-separator class="my-4"></div>
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <div sc-separator orientation="vertical"></div>
        <div>Docs</div>
        <div sc-separator orientation="vertical"></div>
        <div>Source</div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSeparatorDemo {}`;
}
