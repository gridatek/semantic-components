import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextInputGroupDemo } from './text-input-group-demo';

@Component({
  selector: 'app-text-input-group-demo-container',
  imports: [DemoContainer, TextInputGroupDemo],
  template: `
    <app-demo-container
      title="Text"
      demoUrl="/demos/input-group/text-input-group-demo"
      [code]="code"
    >
      <app-text-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupInput,
  ScInputGroupText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-text-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupInput,
    ScInputGroupText,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div sc-input-group>
        <div sc-input-group-addon>
          <span sc-input-group-text>$</span>
        </div>
        <input sc-input-group-input placeholder="Amount" />
        <div sc-input-group-addon align="inline-end">
          <span sc-input-group-text>USD</span>
        </div>
      </div>
      <div sc-input-group>
        <div sc-input-group-addon>
          <span sc-input-group-text>https://</span>
        </div>
        <input sc-input-group-input placeholder="example.com" />
      </div>
      <div sc-input-group>
        <input sc-input-group-input placeholder="Email" />
        <div sc-input-group-addon align="inline-end">
          <span sc-input-group-text>@company.com</span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGroupDemo {}`;
}
