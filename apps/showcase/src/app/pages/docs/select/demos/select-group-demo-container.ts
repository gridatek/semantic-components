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
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectSeparator,
  ScSelectTrigger,
} from '@semantic-components/ui';

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
  ],
  template: \`
    <div scSelect placeholder="Select a food" aria-label="Food dropdown">
      <div scSelectTrigger></div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectGroup>
              <div scSelectGroupLabel>Fruits</div>
              <div scSelectItem value="Apple" label="Apple">Apple</div>
              <div scSelectItem value="Banana" label="Banana">Banana</div>
              <div scSelectItem value="Orange" label="Orange">Orange</div>
            </div>
            <div scSelectSeparator></div>
            <div scSelectGroup>
              <div scSelectGroupLabel>Vegetables</div>
              <div scSelectItem value="Carrot" label="Carrot">Carrot</div>
              <div scSelectItem value="Broccoli" label="Broccoli">Broccoli</div>
              <div scSelectItem value="Spinach" label="Spinach">Spinach</div>
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
