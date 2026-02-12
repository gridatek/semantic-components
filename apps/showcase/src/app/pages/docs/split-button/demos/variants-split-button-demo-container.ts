import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsSplitButtonDemo } from './variants-split-button-demo';

@Component({
  selector: 'app-variants-split-button-demo-container',
  imports: [DemoContainer, VariantsSplitButtonDemo],
  template: `
    <app-demo-container title="Variants" [code]="code">
      <app-variants-split-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsSplitButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSplitButton, type SplitButtonAction } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-variants-split-button-demo',
  imports: [ScSplitButton],
  template: \`
    <div class="flex flex-wrap gap-4">
      <sc-split-button
        label="Default"
        variant="default"
        [actions]="basicActions()"
      />
      <sc-split-button
        label="Secondary"
        variant="secondary"
        [actions]="basicActions()"
      />
      <sc-split-button
        label="Outline"
        variant="outline"
        [actions]="basicActions()"
      />
      <sc-split-button
        label="Destructive"
        variant="destructive"
        [actions]="basicActions()"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsSplitButtonDemo {
  readonly basicActions = signal<SplitButtonAction[]>([
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]);
}`;
}
