import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithIconsButtonDemo } from './with-icons-button-demo';

@Component({
  selector: 'app-with-icons-button-demo-container',
  imports: [DemoContainer, WithIconsButtonDemo],
  template: `
    <app-demo-container
      title="With Icons"
      demoUrl="/demos/button/with-icons-button-demo"
      [code]="code"
    >
      <app-with-icons-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiSettingsIcon, SiUploadIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icons-button-demo',
  imports: [ScButton, SiUploadIcon, SiSettingsIcon],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <button scButton>
        <svg siUploadIcon></svg>
        Upload
      </button>
      <button scButton variant="outline">
        <svg siUploadIcon></svg>
        Export
      </button>
      <button scButton variant="secondary">
        Settings
        <svg siSettingsIcon></svg>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsButtonDemo {}`;
}
