import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BlockEndInputGroupDemo } from './block-end-input-group-demo';

@Component({
  selector: 'app-block-end-input-group-demo-container',
  imports: [DemoContainer, BlockEndInputGroupDemo],
  template: `
    <app-demo-container
      title="Block End"
      demoUrl="/demos/input-group/block-end-input-group-demo"
      [code]="code"
    >
      <app-block-end-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BlockEndInputGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInputGroupText,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-block-end-input-group-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScLabel,
    ScTextarea,
  ],
  template: \`
    <div scFieldGroup class="max-w-sm">
      <div scField>
        <label scLabel>Amount</label>
        <div scInputGroup class="h-auto">
          <input scInput placeholder="Enter amount" inputmode="decimal" />
          <div scInputGroupAddon align="block-end">
            <span scInputGroupText>USD</span>
          </div>
        </div>
        <p scFieldDescription>Footer positioned below the input.</p>
      </div>
      <div scField>
        <label scLabel>Comment</label>
        <div scInputGroup>
          <textarea scTextarea placeholder="Write a comment..."></textarea>
          <div scInputGroupAddon align="block-end">
            <span scInputGroupText>0/280</span>
            <button
              scInputGroupButton
              variant="default"
              size="sm"
              class="ms-auto"
            >
              Post
            </button>
          </div>
        </div>
        <p scFieldDescription>Footer positioned below the textarea.</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BlockEndInputGroupDemo {}`;
}
