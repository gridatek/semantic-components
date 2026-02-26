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
    <app-demo-container title="Disabled Select" [code]="code">
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
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-select-disabled-demo',
  imports: [
    ScSelect,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectLabel,
  ],
  template: \`
    <div
      scSelect
      #select="scSelect"
      placeholder="Select a fruit"
      aria-label="Fruit dropdown"
      disabled
    >
      <div scSelectTrigger>
        <span scSelectLabel>
          <span class="truncate">{{ select.label() }}</span>
        </span>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectItem value="Apple" label="Apple">Apple</div>
            <div scSelectItem value="Banana" label="Banana">Banana</div>
            <div scSelectItem value="Orange" label="Orange">Orange</div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectDisabledDemo {}`;
}
