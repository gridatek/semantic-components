import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectDisabledDemo } from './select-disabled-demo';

@Component({
  selector: 'app-select-disabled-demo-container',
  imports: [DemoContainer, SelectDisabledDemo],
  template: `
    <app-demo-container
      title="Disabled Select"
      demoUrl="/demos/select/select-disabled-demo"
      [code]="code"
    >
      <app-select-disabled-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDisabledDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSelect,
  ScSelectItem,
  ScSelectInput,
  ScSelectItemIndicator,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectTriggerIcon,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-disabled-demo',
  imports: [
    ScSelect,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectInput,
    ScSelectTriggerIcon,
    ScSelectItemIndicator,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: \`
    <div scSelect disabled>
      <div scSelectTrigger>
        <input scSelectInput placeholder="Select a fruit" aria-label="Fruit dropdown" />
        <svg scSelectTriggerIcon siChevronDownIcon aria-hidden="true"></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectItem value="Apple" label="Apple">Apple<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
            <div scSelectItem value="Banana" label="Banana">Banana<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
            <div scSelectItem value="Orange" label="Orange">Orange<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDisabledDemo {}`;
}
