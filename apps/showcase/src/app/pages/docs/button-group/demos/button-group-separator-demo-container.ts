import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonGroupSeparatorDemo } from './button-group-separator-demo';

@Component({
  selector: 'app-button-group-separator-demo-container',
  imports: [DemoContainer, ButtonGroupSeparatorDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-demo-container
      title="Separator"
      demoUrl="/demos/button-group/button-group-separator-demo"
      [code]="code"
    >
      <app-button-group-separator-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSeparatorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
} from '@semantic-components/ui';
import {
  SiClipboardIcon,
  SiClipboardPasteIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-separator-demo',
  imports: [
    ScButton,
    ScButtonGroup,
    ScButtonGroupSeparator,
    SiClipboardIcon,
    SiClipboardPasteIcon,
  ],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: \`
    <div scButtonGroup>
      <button scButton variant="outline">
        <svg siClipboardIcon></svg>
        Copy
      </button>
      <div scButtonGroupSeparator></div>
      <button scButton variant="outline">
        <svg siClipboardPasteIcon></svg>
        Paste
      </button>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSeparatorDemo {}`;
}
