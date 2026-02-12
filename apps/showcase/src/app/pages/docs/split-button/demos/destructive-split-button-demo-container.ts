import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveSplitButtonDemo } from './destructive-split-button-demo';

@Component({
  selector: 'app-destructive-split-button-demo-container',
  imports: [DemoContainer, DestructiveSplitButtonDemo],
  template: `
    <app-demo-container title="Destructive Actions" [code]="code">
      <app-destructive-split-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveSplitButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSplitButton, type SplitButtonAction } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-destructive-split-button-demo',
  imports: [ScSplitButton],
  template: \`
    <sc-split-button label="Manage" [actions]="manageActions()" />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveSplitButtonDemo {
  readonly manageActions = signal<SplitButtonAction[]>([
    { id: 'edit', label: 'Edit' },
    { id: 'duplicate', label: 'Duplicate' },
    { id: 'archive', label: 'Archive' },
    { id: 'delete', label: 'Delete', destructive: true },
  ]);
}`;
}
