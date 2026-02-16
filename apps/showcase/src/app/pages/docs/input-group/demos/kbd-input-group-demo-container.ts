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
  host: { class: 'block' },
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
  ScInputGroup,
  ScInputGroupAddon,
  ScInput,
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
    <div scInputGroup>
      <div scInputGroupAddon>
        <span scInputGroupText>
          <svg si-search-icon></svg>
        </span>
      </div>
      <input scInput variant="group" placeholder="Search..." />
      <div scInputGroupAddon align="inline-end">
        <kbd scKbd>\u2318K</kbd>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KbdInputGroupDemo {}`;
}
