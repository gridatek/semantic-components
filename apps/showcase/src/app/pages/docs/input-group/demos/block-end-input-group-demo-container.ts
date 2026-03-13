import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEndInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInputGroupText,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-block-end-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScTextarea,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup class="h-auto">
        <input scInput variant="group" placeholder="Enter amount" />
        <div scInputGroupAddon align="block-end">
          <span scInputGroupText>USD</span>
        </div>
      </div>
      <div scInputGroup>
        <textarea
          scTextarea
          variant="group"
          placeholder="Write a comment..."
        ></textarea>
        <div scInputGroupAddon align="block-end" class="border-t">
          <span scInputGroupText>0/280</span>
          <button
            scInputGroupButton
            variant="default"
            size="sm"
            class="ml-auto"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEndInputGroupDemo {}`;
}
