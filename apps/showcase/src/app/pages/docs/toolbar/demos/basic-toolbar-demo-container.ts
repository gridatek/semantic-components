import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicToolbarDemo } from './basic-toolbar-demo';

@Component({
  selector: 'app-basic-toolbar-demo-container',
  imports: [DemoContainer, BasicToolbarDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/toolbar/basic-toolbar-demo"
      [code]="code"
    >
      <app-basic-toolbar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToolbarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarToggle,
  ScToolbarToggleGroup,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignStartIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-toolbar-demo',
  imports: [
    ScToolbar,
    ScToolbarToggle,
    ScToolbarToggleGroup,
    ScToolbarSeparator,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiTextAlignStartIcon,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
  ],
  template: \`
    <div scToolbar [values]="['bold']" aria-label="Text formatting">
      <div scToolbarToggleGroup>
        <button scToolbarToggle value="bold">
          <svg siBoldIcon></svg>
          <span class="sr-only">Bold</span>
        </button>
        <button scToolbarToggle value="italic">
          <svg siItalicIcon></svg>
          <span class="sr-only">Italic</span>
        </button>
        <button scToolbarToggle value="underline">
          <svg siUnderlineIcon></svg>
          <span class="sr-only">Underline</span>
        </button>
      </div>

      <div scToolbarSeparator></div>

      <div scToolbarToggleGroup>
        <button scToolbarToggle value="align-left">
          <svg siTextAlignStartIcon></svg>
          <span class="sr-only">Align left</span>
        </button>
        <button scToolbarToggle value="align-center">
          <svg siTextAlignCenterIcon></svg>
          <span class="sr-only">Align center</span>
        </button>
        <button scToolbarToggle value="align-right">
          <svg siTextAlignEndIcon></svg>
          <span class="sr-only">Align right</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToolbarDemo {}`;
}
