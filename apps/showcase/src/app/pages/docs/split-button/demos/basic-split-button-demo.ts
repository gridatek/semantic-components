import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSplitButton,
  type SplitButtonAction,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-split-button-demo',
  imports: [ScSplitButton],
  template: `
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
  `,
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
    this.lastAction.set(`Action: ${action.label}`);
  }
}
