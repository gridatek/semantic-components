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
  host: { class: 'block w-full' },
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
  ScSelectDisplayValue,
  ScSelectGroup,
  ScSelectGroupLabel,
  ScSelectIcon,
  ScSelectInput,
  ScSelectInputGroup,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectSeparator,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-group-demo',
  imports: [
    ScSelect,
    ScSelectDisplayValue,
    ScSelectGroup,
    ScSelectGroupLabel,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectInputGroup,
    ScSelectSeparator,
    ScSelectIcon,
    ScSelectInput,
    ScSelectItemIndicator,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: \`
    <div scSelect>
      <div scSelectInputGroup>
        <span scSelectDisplayValue></span>
        <input
          scSelectInput
          placeholder="Select a food"
          aria-label="Food dropdown"
        />
        <svg scSelectIcon siChevronDownIcon></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectGroup>
              <div scSelectGroupLabel>Fruits</div>
              <div scSelectItem value="Apple" label="Apple">
                Apple
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
              <div scSelectItem value="Banana" label="Banana">
                Banana
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
              <div scSelectItem value="Orange" label="Orange">
                Orange
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
            </div>
            <div scSelectSeparator></div>
            <div scSelectGroup>
              <div scSelectGroupLabel>Vegetables</div>
              <div scSelectItem value="Carrot" label="Carrot">
                Carrot
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
              <div scSelectItem value="Broccoli" label="Broccoli">
                Broccoli
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
              <div scSelectItem value="Spinach" label="Spinach">
                Spinach
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGroupDemo {}`;
}
