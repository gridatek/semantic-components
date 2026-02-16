import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSplitButtonDemo } from './disabled-split-button-demo';

@Component({
  selector: 'app-disabled-split-button-demo-container',
  imports: [DemoContainer, DisabledSplitButtonDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-split-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSplitButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSplitButton, type SplitButtonAction } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-split-button-demo',
  imports: [ScSplitButton],
  template: \`
    <sc-split-button
      label="Disabled"
      [actions]="basicActions()"
      [disabled]="true"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSplitButtonDemo {
  readonly basicActions = signal<SplitButtonAction[]>([
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]);
}`;
}
