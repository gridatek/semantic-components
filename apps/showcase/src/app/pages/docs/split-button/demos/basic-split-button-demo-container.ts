import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSplitButtonDemo } from './basic-split-button-demo';

@Component({
  selector: 'app-basic-split-button-demo-container',
  imports: [DemoContainer, BasicSplitButtonDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-split-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSplitButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSplitButton, type SplitButtonAction } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-split-button-demo',
  imports: [ScSplitButton],
  template: \`
    <sc-split-button
      label="Save"
      [actions]="saveActions()"
      (mainClick)="onSave()"
      (actionClick)="onAction($event)"
    />
    @if (lastAction()) {
      <p class="mt-2 text-sm text-muted-foreground">
        Action: {{ lastAction() }}
      </p>
    }
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSplitButtonDemo {
  readonly lastAction = signal<string | null>(null);

  readonly saveActions = signal<SplitButtonAction[]>([
    { id: 'save-draft', label: 'Save as Draft' },
    { id: 'save-template', label: 'Save as Template' },
    { id: 'save-copy', label: 'Save a Copy' },
  ]);

  onSave(): void {
    this.lastAction.set('Save clicked');
  }

  onAction(action: SplitButtonAction): void {
    this.lastAction.set(\`Action: \${action.label}\`);
  }
}`;
}
