import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToolbarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
    <div scToolbar [values]="['bold']">
      <div scToolbarToggleGroup>
        <button scToolbarToggle value="bold" aria-label="Bold">
          <svg siBoldIcon></svg>
        </button>
        <button scToolbarToggle value="italic" aria-label="Italic">
          <svg siItalicIcon></svg>
        </button>
        <button scToolbarToggle value="underline" aria-label="Underline">
          <svg siUnderlineIcon></svg>
        </button>
      </div>

      <div scToolbarSeparator></div>

      <div scToolbarToggleGroup>
        <button scToolbarToggle value="align-left" aria-label="Align left">
          <svg siTextAlignStartIcon></svg>
        </button>
        <button scToolbarToggle value="align-center" aria-label="Align center">
          <svg siTextAlignCenterIcon></svg>
        </button>
        <button scToolbarToggle value="align-right" aria-label="Align right">
          <svg siTextAlignEndIcon></svg>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToolbarDemo {}`;
}
