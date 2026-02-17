import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextareaInputGroupDemo } from './textarea-input-group-demo';

@Component({
  selector: 'app-textarea-input-group-demo-container',
  imports: [DemoContainer, TextareaInputGroupDemo],
  template: `
    <app-demo-container
      title="Textarea"
      demoUrl="/demos/input-group/textarea-input-group-demo"
      [code]="code"
    >
      <app-textarea-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-textarea-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScTextarea,
  ],
  template: \`
    <div scInputGroup>
      <textarea scTextarea variant="group" placeholder="Type your message..."></textarea>
      <div scInputGroupAddon align="block-end" class="border-t">
        <span scInputGroupText>0/280</span>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputGroupDemo {}`;
}
