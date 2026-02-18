import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNativeSelectDemo } from './basic-native-select-demo';

@Component({
  selector: 'app-basic-native-select-demo-container',
  imports: [DemoContainer, BasicNativeSelectDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/native-select/basic-native-select-demo"
      [code]="code"
    >
      <app-basic-native-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField } from '@semantic-components/ui';
import {
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-native-select-demo',
  imports: [
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScField,
    ScLabel,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-[280px]">
      <label scLabel>Framework</label>
      <div scNativeSelectContainer>
        <select scNativeSelect>
          <option value="">Select a framework</option>
          <option value="next">Next.js</option>
          <option value="angular">Angular</option>
          <option value="vue">Vue</option>
          <option value="svelte">Svelte</option>
        </select>
        <svg
          siChevronDownIcon
          scNativeSelectIcon
          aria-hidden="true"
        ></svg>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeSelectDemo {}`;
}
