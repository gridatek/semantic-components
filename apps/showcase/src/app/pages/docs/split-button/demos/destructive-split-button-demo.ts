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
  selector: 'app-destructive-split-button-demo',
  imports: [ScSplitButton],
  template: `
    <sc-split-button label="Manage" [actions]="manageActions()" />
  `,
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
}
