import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectGroupDemo } from './select-group-demo';

@Component({
  selector: 'app-select-group-demo-container',
  imports: [DemoContainer, SelectGroupDemo],
  template: `
    <app-demo-container
      title="Select with Groups"
      demoUrl="/demos/select/select-group-demo"
      [code]="code"
    >
      <app-select-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSelect,
  ScSelectGroup,
  ScSelectGroupLabel,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectInput,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectSeparator,
  ScSelectTrigger,
  ScSelectTriggerIcon,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-group-demo',
  imports: [
    ScSelect,
    ScSelectGroup,
    ScSelectGroupLabel,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectSeparator,
    ScSelectInput,
    ScSelectTriggerIcon,
    ScSelectItemIndicator,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: \`
    <div scSelect>
      <div scSelectTrigger>
        <input scSelectInput placeholder="Select a food" aria-label="Food dropdown" />
        <svg scSelectTriggerIcon siChevronDownIcon aria-hidden="true"></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectGroup>
              <div scSelectGroupLabel>Fruits</div>
              <div scSelectItem value="Apple" label="Apple">Apple<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
              <div scSelectItem value="Banana" label="Banana">Banana<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
              <div scSelectItem value="Orange" label="Orange">Orange<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
            </div>
            <div scSelectSeparator></div>
            <div scSelectGroup>
              <div scSelectGroupLabel>Vegetables</div>
              <div scSelectItem value="Carrot" label="Carrot">Carrot<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
              <div scSelectItem value="Broccoli" label="Broccoli">Broccoli<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
              <div scSelectItem value="Spinach" label="Spinach">Spinach<svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg></div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGroupDemo {}`;
}
