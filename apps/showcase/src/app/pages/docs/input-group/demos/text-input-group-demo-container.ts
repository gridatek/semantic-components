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
  ScInput,
  ScInputGroupText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-text-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInput,
    ScInputGroupText,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div scInputGroup>
        <div scInputGroupAddon>
          <span scInputGroupText>$</span>
        </div>
        <input scInput variant="group" placeholder="Amount" />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>USD</span>
        </div>
      </div>
      <div scInputGroup>
        <div scInputGroupAddon>
          <span scInputGroupText>https://</span>
        </div>
        <input scInput variant="group" placeholder="example.com" />
      </div>
      <div scInputGroup>
        <input scInput variant="group" placeholder="Email" />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>@company.com</span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGroupDemo {}`;
}
