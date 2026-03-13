import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KbdInputGroupDemo } from './kbd-input-group-demo';

@Component({
  selector: 'app-kbd-input-group-demo-container',
  imports: [DemoContainer, KbdInputGroupDemo],
  template: `
    <app-demo-container
      title="Kbd"
      demoUrl="/demos/input-group/kbd-input-group-demo"
      [code]="code"
    >
      <app-kbd-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KbdInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScKbd,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-kbd-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInput,
    ScInputGroupText,
    ScKbd,
    SiSearchIcon,
  ],
  template: \`
    <div scInputGroup class="w-full max-w-sm">
      <div scInputGroupAddon>
        <span scInputGroupText>
          <svg siSearchIcon></svg>
        </span>
      </div>
      <input scInput placeholder="Search..." />
      <div scInputGroupAddon align="inline-end">
        <kbd scKbd>&#8984;K</kbd>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KbdInputGroupDemo {}`;
}
