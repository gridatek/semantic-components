import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BlockStartInputGroupDemo } from './block-start-input-group-demo';

@Component({
  selector: 'app-block-start-input-group-demo-container',
  imports: [DemoContainer, BlockStartInputGroupDemo],
  template: `
    <app-demo-container
      title="Block Start"
      demoUrl="/demos/input-group/block-start-input-group-demo"
      [code]="code"
    >
      <app-block-start-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockStartInputGroupDemoContainer {
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
import { SiCopyIcon, SiFileCodeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-block-start-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScTextarea,
    SiFileCodeIcon,
    SiCopyIcon,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup class="h-auto">
        <div scInputGroupAddon align="block-start">
          <span scInputGroupText>Full Name</span>
        </div>
        <input scInput variant="group" placeholder="Enter your name" />
      </div>
      <div scInputGroup>
        <div scInputGroupAddon align="block-start">
          <span scInputGroupText>
            <svg siFileCodeIcon></svg>
          </span>
          <span scInputGroupText class="font-mono">script.js</span>
          <button
            scInputGroupButton
            size="icon-xs"
            class="ml-auto"
            aria-label="Copy"
          >
            <svg siCopyIcon></svg>
          </button>
        </div>
        <textarea
          scTextarea
          variant="group"
          class="font-mono text-sm"
          placeholder="console.log('Hello, world!');"
        ></textarea>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockStartInputGroupDemo {}`;
}
